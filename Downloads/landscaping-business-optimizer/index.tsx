/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// --- API Key Handling & Security Note ---
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail. Ensure it's configured in your environment.");
    const appContainer = document.getElementById('app-container');
    if (appContainer) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = "Configuration Error: API Key for AI services is missing. Please contact support or check setup.";
        errorDiv.style.color = 'red';
        errorDiv.style.backgroundColor = 'white';
        errorDiv.style.padding = '10px';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.fontWeight = 'bold';
        errorDiv.style.border = '2px solid red';
        errorDiv.style.borderRadius = 'var(--border-radius)';
        appContainer.insertBefore(errorDiv, appContainer.firstChild);
    }
}
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });
const geminiModel = 'gemini-2.5-flash-preview-04-17';

// --- Types ---
type JobStatus = 'Quote Request' | 'Booked' | 'Completed' | 'Cancelled' | 'Pending Scheduling';
type JobRecurrence = 'One-off' | 'Weekly' | 'Bi-weekly' | 'Monthly';

interface Job {
    id: string;
    clientName: string;
    jobType: string;
    jobAddress: string;
    revenue: number;
    laborCost: number; 
    materialCost: number;
    profit: number;
    margin: number;
    description?: string;
    detailedCosts?: string;
    status: JobStatus;
    dateCreated: string; 
    recurrence: JobRecurrence;
    scheduledDate?: string; 
    completedDate?: string; 
    clientContact?: string; 
}

interface QuoteRequest { 
    id: string;
    clientName: string;
    clientContact: string;
    serviceRequested: string;
    dateLogged: string; 
}

// --- Global State (Session Only) ---
let loggedJobs: Job[] = []; 
let quoteRequests: QuoteRequest[] = []; 

// Wizard state
let currentWizardData: Partial<Job> = {
    revenue: 0,
    laborCost: 0,
    materialCost: 0,
    profit: 0,
    margin: 0,
    recurrence: 'One-off', 
    status: 'Quote Request' 
};


// --- Helper Functions ---
function getElementByIdOrThrow<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id) as T | null;
    if (!element) {
        throw new Error(`Element with id '${id}' not found.`);
    }
    return element;
}

function getInputValue(id: string): string {
    return (getElementByIdOrThrow<HTMLInputElement>(id)).value.trim();
}
function getTextareaValue(id: string): string {
    return (getElementByIdOrThrow<HTMLTextAreaElement>(id)).value.trim();
}
function getSelectValue(id: string): string {
    return (getElementByIdOrThrow<HTMLSelectElement>(id)).value;
}

function setInputValue(id: string, value: string | number | undefined): void {
    if (value === undefined) value = "";
    (getElementByIdOrThrow<HTMLInputElement>(id)).value = String(value);
}
function setTextareaValue(id: string, value: string | undefined): void {
     if (value === undefined) value = "";
    (getElementByIdOrThrow<HTMLTextAreaElement>(id)).value = value;
}
function setSelectValue(id: string, value: string | undefined): void {
    if (value === undefined) return;
    (getElementByIdOrThrow<HTMLSelectElement>(id)).value = value;
}


function getInputValueAsNumber(id: string): number {
    const value = parseFloat(getInputValue(id));
    return isNaN(value) ? 0 : value;
}

function parseCurrencyValueFromString(text: string, label: string): number {
    // Try to find an exact label match first, e.g., "Estimated Labor Cost: $123.45"
    const exactLabelRegex = new RegExp(`${label}\\s*:\\s*\\$?(\\d+\\.?\\d*)`, 'i');
    let match = text.match(exactLabelRegex);
    if (match && match[1]) {
        return parseFloat(match[1]);
    }

    // Fallback: look for lines containing the label and a currency value
    // e.g. "Some text... Estimated Labor Cost ... $123.45 ..."
    const lines = text.split('\n');
    const labelKeywords = label.toLowerCase().split(' ');
    for (const line of lines) {
        const lowerLine = line.toLowerCase();
        if (labelKeywords.every(keyword => lowerLine.includes(keyword))) {
            const currencyMatch = line.match(/\$?(\d+\.?\d*)/);
            if (currencyMatch && currencyMatch[1]) {
                return parseFloat(currencyMatch[1]);
            }
        }
    }
    
    // Final fallback: generic regex if the label is very close to a number, but this is less reliable
    // This was the previous genericRegex, made more specific to reduce false positives
    const genericLabelProximityRegex = new RegExp(`(?:${label.split(' ')[0]}|cost|value)\\s*(?:is|:)?\\s*\\$?(\\d+\\.?\\d*)`, 'i');
    match = text.match(genericLabelProximityRegex);
    if (match && match[1] && text.toLowerCase().includes(label.split(' ')[0].toLowerCase())) {
         return parseFloat(match[1]);
    }

    console.warn(`Could not parse currency value for "${label}" from text: "${text}"`);
    return 0; 
}


function displayInResultBox(elementId: string, message: string, type: 'good' | 'neutral' | 'low' | 'info' | 'error' = 'info', isHtml: boolean = true) {
    const resultBox = getElementByIdOrThrow(elementId);
    if (isHtml) {
        resultBox.innerHTML = message;
    } else {
        resultBox.textContent = message;
    }
    resultBox.className = 'result-box'; 
    if (elementId.includes('mini-result-box')) resultBox.classList.add('mini-result-box');
    if (type === 'good') resultBox.classList.add('good-profit');
    else if (type === 'neutral') resultBox.classList.add('neutral-profit');
    else if (type === 'low' || type === 'error') resultBox.classList.add('low-profit');
    else resultBox.classList.add('info'); 
}

function showLoading(elementId: string, message: string = "🧠 AI is thinking...") {
    const resultBox = getElementByIdOrThrow(elementId);
    resultBox.innerHTML = `<p class="loading-message">${message}</p>`;
    resultBox.className = 'result-box loading';
    if (elementId.includes('mini-result-box')) resultBox.classList.add('mini-result-box');
}


// --- Navigation Logic ---
function switchPage(targetPageId: string): void {
    document.querySelectorAll<HTMLElement>('.page-content').forEach(page => {
        page.classList.remove('active-page');
    });
    document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(link => {
        link.classList.remove('active-link');
    });

    const targetPage = getElementByIdOrThrow<HTMLElement>(targetPageId);
    targetPage.classList.add('active-page');

    const activeNavLink = document.querySelector<HTMLAnchorElement>(`.nav-link[data-page="${targetPageId}"]`);
    if (activeNavLink) {
        activeNavLink.classList.add('active-link');
    }
     window.scrollTo(0, 0); 
}

function closeCollapsibleMenu() {
    const mainNav = getElementByIdOrThrow<HTMLElement>('main-nav');
    const navToggleBtn = getElementByIdOrThrow<HTMLButtonElement>('nav-toggle-btn');
    if (mainNav.classList.contains('nav-open')) {
        mainNav.classList.remove('nav-open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
    }
}


// --- Core Landscaping Logic ---

function calculateProfitMargin(revenue: number, laborCost: number, materialCost: number): { margin: number; profit: number } {
    if (revenue === 0 && (laborCost > 0 || materialCost > 0)) {
        return { margin: -Infinity, profit: 0 - laborCost - materialCost };
    }
    if (revenue === 0) {
        return { margin: 0, profit: 0 };
    }
    const totalCost = laborCost + materialCost;
    const profit = revenue - totalCost;
    const margin = (profit / revenue) * 100;
    return { margin, profit };
}

function getSeason(date: Date = new Date()): string {
    const month = date.getMonth(); 
    if (month >= 2 && month <= 4) return "Spring"; 
    if (month >= 5 && month <= 7) return "Summer"; 
    if (month >= 8 && month <= 10) return "Autumn"; 
    return "Winter"; 
}

// --- Gemini API Call ---
async function callGeminiAPI(prompt: string, resultBoxId: string): Promise<string | null> {
    if (!apiKey) {
        displayInResultBox(resultBoxId, "AI Service Error: API Key not configured. Cannot fetch insights.", 'error');
        return null;
    }
    showLoading(resultBoxId);
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: geminiModel,
            contents: prompt,
        });
        const textOutput = response.text; 
        displayInResultBox(resultBoxId, textOutput.replace(/\n/g, '<br>'), 'info', true);
        return textOutput; 
    } catch (error) {
        console.error("Gemini API call failed:", error);
        let errorMessage = "An error occurred while fetching AI insights. Please try again later.";
        if (error instanceof Error) {
            errorMessage += `<br><small>Details: ${error.message}</small>`;
        }
        displayInResultBox(resultBoxId, errorMessage, 'error', true);
        return null;
    }
}

// --- Wizard Logic ---
function switchWizardStep(targetStepId: string) {
    document.querySelectorAll<HTMLElement>('.wizard-step').forEach(step => {
        step.classList.remove('active-step');
    });
    getElementByIdOrThrow<HTMLElement>(targetStepId).classList.add('active-step');
    if (targetStepId === 'wizard-step-5') {
        getElementByIdOrThrow('wizard-scheduled-date-container').style.display = 'grid'; // Show for review
        updateWizardSummary(); // Ensure summary is fresh when landing on step 5
    } else {
        // Hide schedule date container for other steps if it was made visible
        const scheduleContainer = document.getElementById('wizard-scheduled-date-container');
        if(scheduleContainer) scheduleContainer.style.display = 'none';
    }
}

function collectWizardStepData(stepId: string): Partial<Job> {
    const data: Partial<Job> = {};
    if (stepId === 'wizard-step-1') {
        data.clientName = getInputValue('wizard-client-name');
        data.clientContact = getInputValue('wizard-client-contact'); 
        data.jobAddress = getInputValue('wizard-client-address');
    } else if (stepId === 'wizard-step-2') {
        data.jobType = getInputValue('wizard-job-type');
        data.description = getTextareaValue('wizard-job-description');
        data.recurrence = getSelectValue('wizard-job-recurrence') as JobRecurrence;
    } else if (stepId === 'wizard-step-3') {
        data.revenue = getInputValueAsNumber('wizard-revenue');
    } else if (stepId === 'wizard-step-4') {
        data.detailedCosts = getTextareaValue('wizard-detailed-costs');
    } else if (stepId === 'wizard-step-5') {
        // Scheduled date is optional, only collect if wizard-scheduled-date input is visible and has a value
        const scheduledDateInput = getElementByIdOrThrow<HTMLInputElement>('wizard-scheduled-date');
        if (getElementByIdOrThrow('wizard-scheduled-date-container').style.display !== 'none' && scheduledDateInput.value) {
            data.scheduledDate = scheduledDateInput.value;
        }
    }
    return data;
}


function updateProfitVisualBar(margin: number, profitType: 'good' | 'neutral' | 'low' | 'info', containerId: string, barId: string) {
    const barContainer = getElementByIdOrThrow<HTMLDivElement>(containerId);
    const bar = getElementByIdOrThrow<HTMLDivElement>(barId);

    barContainer.style.display = 'block'; // Make sure it's visible

    let percentage = 0;
    if (!isNaN(margin) && isFinite(margin) && margin !== -Infinity) {
        percentage = Math.max(0, Math.min(100, margin)); 
    } else if (margin === -Infinity) { // Explicit loss
        percentage = 0; // Show no positive bar for a loss
    }


    bar.style.width = `${percentage}%`;
    bar.classList.remove('good-profit-bg', 'neutral-profit-bg', 'low-profit-bg', 'info-profit-bg'); 
    
    if (margin === -Infinity || (currentWizardData.revenue === 0 && (currentWizardData.laborCost || 0) + (currentWizardData.materialCost || 0) > 0) ) {
        bar.style.backgroundColor = 'var(--color-error)';
        bar.style.width = '100%'; // Show full red bar for loss if revenue is 0 but costs exist
        if (currentWizardData.revenue === 0 && currentWizardData.laborCost === 0 && currentWizardData.materialCost === 0 && !currentWizardData.clientName) {
             barContainer.style.display = 'none'; // Hide if no data at all
        }
    } else if (profitType === 'good') {
        bar.style.backgroundColor = 'var(--color-success)'; 
    } else if (profitType === 'neutral') {
        bar.style.backgroundColor = 'var(--color-warning)'; 
    } else if (profitType === 'low') {
        bar.style.backgroundColor = 'var(--color-error)';
    } else { 
        bar.style.backgroundColor = 'var(--color-accent-blue)'; 
         if (isNaN(margin) || !isFinite(margin) || (currentWizardData.revenue === 0 && currentWizardData.laborCost === 0 && currentWizardData.materialCost === 0)) {
            bar.style.width = '0%'; 
            barContainer.style.display = 'none'; 
        }
    }
}


function updateWizardSummary() {
    const summaryBox = getElementByIdOrThrow('wizard-summary-review');
    // Ensure all potentially relevant data is collected before summary
    // This merges data from previous steps with any new data from the current step if called mid-wizard
    // For step 5, it ensures revenue and AI costs are included.
    if (document.getElementById('wizard-step-3')?.classList.contains('active-step')) {
         currentWizardData = { ...currentWizardData, ...collectWizardStepData('wizard-step-3') };
    }
     if (document.getElementById('wizard-step-4')?.classList.contains('active-step')) {
         currentWizardData = { ...currentWizardData, ...collectWizardStepData('wizard-step-4') };
    }


    const { clientName, jobType, description, jobAddress, recurrence, scheduledDate, revenue = 0, laborCost = 0, materialCost = 0 } = currentWizardData;
    const { profit, margin } = calculateProfitMargin(revenue, laborCost, materialCost);
    
    currentWizardData.profit = profit;
    currentWizardData.margin = margin;

    let summaryHTML = `<h4>Quote/Job Summary:</h4>`;
    summaryHTML += `<p><strong>Client:</strong> ${clientName || 'N/A'}</p>`;
    summaryHTML += `<p><strong>Job Type:</strong> ${jobType || 'N/A'}</p>`;
    summaryHTML += `<p><strong>Address:</strong> ${jobAddress || 'N/A'}</p>`;
    summaryHTML += `<p><strong>Recurrence:</strong> ${recurrence || 'N/A'}</p>`;
    
    const currentStatus = currentWizardData.status || 'Quote Request'; // Default to quote if not set
    summaryHTML += `<p><strong>Status:</strong> ${currentStatus}</p>`;

    if (currentStatus === 'Booked' && scheduledDate) {
         summaryHTML += `<p><strong>Scheduled Date:</strong> ${scheduledDate}</p>`;
    } else if (currentWizardData.status === 'Quote Request' && getInputValue('wizard-scheduled-date')) {
        // If user entered a date but is saving as quote, clarify it's not scheduled yet
        summaryHTML += `<p><strong>Proposed Date (if booked):</strong> ${getInputValue('wizard-scheduled-date')}</p>`;
    }


    if (description) summaryHTML += `<p><strong>Description:</strong> ${description}</p>`;
    summaryHTML += `<p><strong>Proposed Revenue:</strong> $${revenue.toFixed(2)}</p>`;
    summaryHTML += `<p><strong>Est. Labor Cost (AI):</strong> $${laborCost.toFixed(2)}</p>`;
    summaryHTML += `<p><strong>Est. Material Cost (AI):</strong> $${materialCost.toFixed(2)}</p>`;
    
    let profitMessage: string;
    let profitType: 'good' | 'neutral' | 'low' | 'info' = 'info';

    if (margin === -Infinity) {
        profitMessage = `Job results in a loss of $${Math.abs(profit).toFixed(2)}. Consider increasing revenue or reducing costs.`;
        profitType = 'low';
    } else if (isNaN(margin) || !isFinite(margin)) {
        profitMessage = "Profit cannot be calculated. Ensure revenue and cost estimates are entered.";
        profitType = 'low';
         if (revenue === 0 && laborCost === 0 && materialCost === 0 && !clientName && !jobType) {
            profitMessage = "Enter job details (client, type, revenue) to see summary and estimates.";
            profitType = 'info';
        }
    } else {
        profitMessage = `<strong>Est. Profit:</strong> $${profit.toFixed(2)} | <strong>Est. Margin:</strong> ${margin.toFixed(2)}%`;
        if (margin >= 30) profitType = 'good';
        else if (margin >= 15) profitType = 'neutral';
        else profitType = 'low';
    }
    summaryHTML += `<p class="${profitType}-profit-text">${profitMessage}</p>`; // Use class for text color
    summaryBox.innerHTML = summaryHTML;
    updateProfitVisualBar(margin, profitType, 'wizard-profit-margin-bar-container', 'wizard-profit-margin-bar');
}

async function handleAiEstimateCosts() {
    currentWizardData = { ...currentWizardData, ...collectWizardStepData('wizard-step-3') }; // Collect revenue from step 3
    currentWizardData = { ...currentWizardData, ...collectWizardStepData('wizard-step-2') }; // Ensure job type/desc is included from step 2

    const { jobType, description, revenue } = currentWizardData;
    const resultBoxId = "wizard-step-3-ai-result";

    if (!jobType || revenue === undefined || revenue <= 0) {
        displayInResultBox(resultBoxId, "Please enter Job Type (Step 2) and a valid Proposed Revenue first.", 'info', false);
        return;
    }

    const prompt = `For a landscaping job of type "${jobType}" described as "${description || 'Not specified'}", with a proposed revenue of $${revenue.toFixed(2)}, please estimate the following:
1.  Estimated Labor Cost: $VALUE (Provide a specific dollar amount)
2.  Estimated Material Cost: $VALUE (Provide a specific dollar amount)
3.  Calculate the resulting Estimated Profit: $VALUE (Revenue - Labor Cost - Material Cost)
4.  Calculate the resulting Estimated Profit Margin: VALUE% ((Profit / Revenue) * 100)
5.  Provide 1-2 key considerations for managing costs for this type of job to maximize profitability.

Present the cost, profit, and margin figures clearly labeled as shown above so they can be easily processed. Ensure dollar amounts have a $ prefix.`;

    const aiResponseText = await callGeminiAPI(prompt, resultBoxId);

    if (aiResponseText) {
        const estimatedLabor = parseCurrencyValueFromString(aiResponseText, "Estimated Labor Cost");
        const estimatedMaterial = parseCurrencyValueFromString(aiResponseText, "Estimated Material Cost");
        
        currentWizardData.laborCost = estimatedLabor;
        currentWizardData.materialCost = estimatedMaterial;
        
        // Re-calculate profit/margin based on AI estimates if they were found
        const {profit, margin} = calculateProfitMargin(currentWizardData.revenue!, currentWizardData.laborCost, currentWizardData.materialCost);
        currentWizardData.profit = profit;
        currentWizardData.margin = margin;
        
        // Update the result box text with a more structured display *if* parsing was successful
        if (estimatedLabor > 0 || estimatedMaterial > 0) {
            let refinedDisplay = `<p><strong>AI Cost & Profitability Estimate:</strong></p>
            <ul>
                <li>Estimated Labor Cost: $${estimatedLabor.toFixed(2)}</li>
                <li>Estimated Material Cost: $${estimatedMaterial.toFixed(2)}</li>
                <li>Estimated Profit: $${profit.toFixed(2)}</li>
                <li>Estimated Margin: ${margin.toFixed(2)}%</li>
            </ul>`;
            // Try to extract considerations from the original AI response
            const considerationsMatch = aiResponseText.match(/considerations:(.*)/is);
            if (considerationsMatch && considerationsMatch[1]) {
                refinedDisplay += `<p><strong>Key Considerations:</strong>${considerationsMatch[1].trim().replace(/\n/g, '<br>')}</p>`;
            } else {
                 // Fallback if considerations not easily parsed: show relevant part of original response
                const originalResponseLines = aiResponseText.split('\n');
                const costLines = originalResponseLines.filter(line => !line.toLowerCase().includes("cost:") && !line.toLowerCase().includes("profit:") && !line.toLowerCase().includes("margin:")).join('<br>');
                if(costLines.length > 10) refinedDisplay += `<p><strong>Additional AI Notes:</strong><br>${costLines}</p>`;
            }
             displayInResultBox(resultBoxId, refinedDisplay, 'info', true);
        }
        // Always update the summary view in Step 5 (or any view that shows currentWizardData)
        updateWizardSummary();
    } else {
        // AI call failed or returned null, summary might still need update if revenue changed
        updateWizardSummary();
    }
}


function updateWizardStatus(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const statusEl = getElementByIdOrThrow<HTMLParagraphElement>('wizard-status');
    statusEl.textContent = message;
    statusEl.className = 'status-message'; // Reset classes
    if (type === 'success') statusEl.classList.add('success-message-text'); 
    else if (type === 'error') statusEl.classList.add('error-message-text'); 
    else statusEl.classList.add('info-message-text');
    
    setTimeout(() => {
        if (statusEl.textContent === message) { // Only clear if it's the same message
            statusEl.textContent = '';
            statusEl.className = 'status-message';
        }
    }, 7000);
}

function handleFinalizeWizard(action: 'saveQuote' | 'logJob') {
    // Collect data from all relevant steps one last time
    currentWizardData = { 
        ...currentWizardData, 
        ...collectWizardStepData('wizard-step-1'),
        ...collectWizardStepData('wizard-step-2'),
        ...collectWizardStepData('wizard-step-3'),
        ...collectWizardStepData('wizard-step-4'), // Includes optional detailed costs
        ...collectWizardStepData('wizard-step-5')  // Includes optional scheduled date
    };

    if (!currentWizardData.clientName || !currentWizardData.jobType || currentWizardData.revenue === undefined) {
        updateWizardStatus("Missing required fields (Client Name, Job Type, Revenue). Please complete all steps.", 'error');
        // Try to navigate to the first step with missing essential data
        if (!currentWizardData.clientName) switchWizardStep('wizard-step-1');
        else if (!currentWizardData.jobType) switchWizardStep('wizard-step-2');
        else if (currentWizardData.revenue === undefined) switchWizardStep('wizard-step-3');
        return;
    }
    
    const finalJob: Job = {
        id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        clientName: currentWizardData.clientName || 'N/A',
        jobType: currentWizardData.jobType || 'N/A',
        jobAddress: currentWizardData.jobAddress || 'N/A',
        revenue: currentWizardData.revenue || 0,
        laborCost: currentWizardData.laborCost || 0,
        materialCost: currentWizardData.materialCost || 0,
        profit: currentWizardData.profit || 0,
        margin: currentWizardData.margin || 0,
        description: currentWizardData.description,
        detailedCosts: currentWizardData.detailedCosts,
        status: action === 'saveQuote' ? 'Quote Request' : 'Booked',
        dateCreated: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        recurrence: currentWizardData.recurrence || 'One-off',
        clientContact: currentWizardData.clientContact
    };

    if (action === 'logJob') {
        finalJob.status = 'Booked';
        if (currentWizardData.scheduledDate) {
            finalJob.scheduledDate = currentWizardData.scheduledDate;
        } else {
            finalJob.status = 'Pending Scheduling'; // If logged but no date set
        }
    } else { // saveQuote
        finalJob.status = 'Quote Request';
        finalJob.scheduledDate = undefined; // Ensure no schedule date for quotes
    }
    currentWizardData.status = finalJob.status; // Update wizard state for summary
    currentWizardData.scheduledDate = finalJob.scheduledDate;


    loggedJobs.push(finalJob);
    renderLoggedJobsAndSummary(); 
    updateWizardSummary(); // Refresh summary in wizard with final status/date

    const message = action === 'saveQuote' ? "Quote request saved successfully!" : 
                    (finalJob.status === 'Booked' ? "Job logged and scheduled successfully!" : "Job logged (pending scheduling).");
    updateWizardStatus(message, 'success');

    // Disable buttons briefly to prevent double submission
    getElementByIdOrThrow<HTMLButtonElement>('wizard-save-quote-btn').disabled = true;
    getElementByIdOrThrow<HTMLButtonElement>('wizard-log-job-btn').disabled = true;
    setTimeout(() => {
        getElementByIdOrThrow<HTMLButtonElement>('wizard-save-quote-btn').disabled = false;
        getElementByIdOrThrow<HTMLButtonElement>('wizard-log-job-btn').disabled = false;
    }, 2000);

    console.log("Finalized Job/Quote: ", finalJob);
}

function resetWizard() {
    currentWizardData = {
        revenue: 0,
        laborCost: 0,
        materialCost: 0,
        profit: 0,
        margin: 0,
        recurrence: 'One-off',
        status: 'Quote Request'
    };
    
    const wizardContainer = getElementByIdOrThrow('quote-job-wizard');
    wizardContainer.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea').forEach(input => {
        (input as HTMLInputElement | HTMLTextAreaElement).value = '';
    });
    wizardContainer.querySelectorAll('select').forEach(select => {
        (select as HTMLSelectElement).selectedIndex = 0; 
    });
    
    setSelectValue('wizard-job-recurrence', 'One-off');
    setInputValue('wizard-revenue', ''); // Explicitly clear number input

    document.querySelectorAll('.wizard-step .result-box, .wizard-step .mini-result-box').forEach(box => {
        box.innerHTML = '';
        if (box.id === 'wizard-step-3-ai-result') {
            box.textContent = "Enter revenue and click above to get AI cost estimates.";
        }
         const classList = ['result-box'];
        if (box.id.includes('mini-result-box')) classList.push('mini-result-box');
        box.className = classList.join(' ');
    });
    
    getElementByIdOrThrow('wizard-profit-margin-bar-container').style.display = 'none';
    const profitBar = getElementByIdOrThrow('wizard-profit-margin-bar');
    profitBar.style.width = '0%';
    profitBar.style.backgroundColor = 'transparent';


    updateWizardSummary(); // Update summary to reflect cleared state
    updateWizardStatus("Wizard reset. Ready for new entry.", "info");
    switchWizardStep('wizard-step-1');
    getElementByIdOrThrow('wizard-scheduled-date-container').style.display = 'none'; // Hide schedule date input on reset
}


// --- Quote Request Form Logic (Manual Entry) ---
function handleAddQuoteRequest(event: Event) {
    event.preventDefault();
    const clientName = getInputValue('quote-client-name');
    const clientContact = getInputValue('quote-client-contact');
    const serviceRequested = getTextareaValue('quote-service-requested');

    if (!clientName || !serviceRequested) {
        alert("Please enter client name and service requested for the quote.");
        return;
    }

    const newQuoteRequest: QuoteRequest = {
        id: `qr_${Date.now()}`,
        clientName,
        clientContact,
        serviceRequested,
        dateLogged: new Date().toLocaleDateString()
    };
    quoteRequests.push(newQuoteRequest);
    renderQuoteRequests();
    (getElementByIdOrThrow('log-quote-request-form') as HTMLFormElement).reset();
}

function renderQuoteRequests() {
    const listContainer = getElementByIdOrThrow('quote-requests-list');
    if (quoteRequests.length === 0) {
        listContainer.innerHTML = '<p>No quote requests logged in this session.</p>';
        return;
    }
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Client Name</th>
                <th>Contact</th>
                <th>Service Requested</th>
                <th>Date Logged</th>
            </tr>
        </thead>
        <tbody>
            ${quoteRequests.map(qr => `
                <tr>
                    <td>${qr.clientName}</td>
                    <td>${qr.clientContact || 'N/A'}</td>
                    <td>${qr.serviceRequested}</td>
                    <td>${qr.dateLogged}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    listContainer.innerHTML = '';
    listContainer.appendChild(table);
}

// --- Logged Jobs & Session Summary ---
function renderLoggedJobsAndSummary() {
    const listContainer = getElementByIdOrThrow('logged-jobs-list');
    let totalRevenue = 0;
    let totalLaborCost = 0;
    let totalMaterialCost = 0;

    if (loggedJobs.length === 0) {
        listContainer.innerHTML = '<p>No jobs logged yet in this session.</p>';
    } else {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Job Type</th>
                    <th>Status</th>
                    <th>Scheduled</th>
                    <th>Revenue</th>
                    <th>Profit</th>
                    <th>Margin (%)</th>
                </tr>
            </thead>
            <tbody>
                ${loggedJobs.map(job => {
                    totalRevenue += job.revenue;
                    totalLaborCost += job.laborCost;
                    totalMaterialCost += job.materialCost;
                    return `
                        <tr>
                            <td>${job.clientName}</td>
                            <td>${job.jobType}</td>
                            <td>${job.status}</td>
                            <td>${job.scheduledDate || 'N/A'}</td>
                            <td>$${job.revenue.toFixed(2)}</td>
                            <td>$${job.profit.toFixed(2)}</td>
                            <td class="${job.margin >= 30 ? 'good-profit-text' : job.margin >= 15 ? 'neutral-profit-text' : 'low-profit-text'}">${isFinite(job.margin) ? job.margin.toFixed(2) : (job.revenue === 0 && job.profit < 0 ? 'LOSS' : 'N/A') }</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
        listContainer.innerHTML = '';
        listContainer.appendChild(table);
    }

    const totalCosts = totalLaborCost + totalMaterialCost;
    const totalProfit = totalRevenue - totalCosts;
    const overallMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : (totalProfit < 0 ? -Infinity : 0) ;

    const summaryDetails = getElementByIdOrThrow('session-summary-details');
    summaryDetails.innerHTML = `
        <p>Total Revenue: $${totalRevenue.toFixed(2)}</p>
        <p>Total Costs: $${totalCosts.toFixed(2)}</p>
        <p>Total Profit: $${totalProfit.toFixed(2)}</p>
        <p>Overall Profit Margin: ${isFinite(overallMargin) ? overallMargin.toFixed(2) + '%' : (overallMargin === -Infinity ? 'Loss' : 'N/A')}</p>
    `;
}


// --- Calendar Logic ---
let currentCalendarDate = new Date();

function renderCalendar() {
    const calendarGrid = getElementByIdOrThrow('calendar-page').querySelector('.calendar-grid')!;
    const monthYearDisplay = getElementByIdOrThrow('month-year-display');

    calendarGrid.innerHTML = ''; // Clear previous
    monthYearDisplay.textContent = `${currentCalendarDate.toLocaleString('default', { month: 'long' })} ${currentCalendarDate.getFullYear()}`;

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const dayOfWeekOfFirst = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

    // Add day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(name => {
        const dayNameCell = document.createElement('div');
        dayNameCell.classList.add('day-name');
        dayNameCell.textContent = name;
        calendarGrid.appendChild(dayNameCell);
    });

    // Add empty cells for days before the first of the month
    for (let i = 0; i < dayOfWeekOfFirst; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('other-month');
        calendarGrid.appendChild(emptyCell);
    }

    // Add day cells
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = String(day);
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayCell.classList.add('current-day');
        }
        // TODO: Add indicators for scheduled jobs from `loggedJobs`
        calendarGrid.appendChild(dayCell);
    }
}

// --- AI Insights Page Prompts ---
const seasonalBusinessTipsPrompt = () => `As an AI business consultant for a landscaping company, provide 3 actionable business improvement tips relevant for the current ${getSeason()} season. Focus on areas like customer acquisition, operational efficiency, or upselling.`;
const seasonalServiceFocusPrompt = () => `Based on the current ${getSeason()} season, what are 3 specific landscaping services our company should focus on promoting and offering? Provide a brief rationale for each.`;
const marketPulsePrompt = () => `Provide a brief "Market Pulse" for the landscaping industry right now, considering the ${getSeason()} season. Highlight 1-2 potential opportunities (e.g., new trends, demands) and 1-2 potential challenges (e.g., supply issues, weather patterns) a small landscaping business should be aware of.`;
const weeklyOutlookPrompt = () => `Provide a "Weekly Outlook" for a landscaping business for the upcoming week, considering it's currently ${getSeason()}. Include:
1.  A general weather theme/consideration (e.g., "Expect sunny days, ideal for installations").
2.  A suggested operational focus (e.g., "Prioritize lawn mowing and garden bed maintenance").
3.  A customer communication tip (e.g., "Remind clients about watering needs if it's dry").`;

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Collapsible Navigation Menu
    const navToggleBtn = getElementByIdOrThrow<HTMLButtonElement>('nav-toggle-btn');
    const mainNav = getElementByIdOrThrow<HTMLElement>('main-nav');

    navToggleBtn.addEventListener('click', () => {
        const isExpanded = mainNav.classList.toggle('nav-open');
        navToggleBtn.setAttribute('aria-expanded', String(isExpanded));
    });

    // Navigation Links
    document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = (e.target as HTMLAnchorElement).dataset.page;
            if (targetPageId) {
                switchPage(targetPageId);
                closeCollapsibleMenu(); // Close menu after navigation
            }
        });
    });

    // Dashboard Buttons
    getElementByIdOrThrow('go-to-new-quote-wizard-btn').addEventListener('click', () => {
        switchPage('quotes-jobs-page');
        resetWizard(); // Ensure wizard is fresh
        switchWizardStep('wizard-step-1'); 
        getElementByIdOrThrow('wizard-client-name').focus();
    });
    getElementByIdOrThrow('go-to-log-quote-request-btn').addEventListener('click', () => {
        switchPage('quotes-jobs-page');
        getElementByIdOrThrow('quote-client-name').focus();
    });
    getElementByIdOrThrow('get-ai-weekly-outlook-btn').addEventListener('click', () => callGeminiAPI(weeklyOutlookPrompt(), 'ai-weekly-outlook-result'));
    getElementByIdOrThrow('get-dashboard-market-pulse-btn').addEventListener('click', () => callGeminiAPI(marketPulsePrompt(), 'dashboard-market-pulse-result'));
    

    // Wizard Navigation & Actions
    document.querySelectorAll<HTMLButtonElement>('.wizard-next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.closest('.wizard-step') as HTMLElement;
            currentWizardData = { ...currentWizardData, ...collectWizardStepData(currentStep.id) };
            updateWizardSummary(); // Update summary as user moves through steps
            switchWizardStep(btn.dataset.next!);
        });
    });
    document.querySelectorAll<HTMLButtonElement>('.wizard-prev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.closest('.wizard-step') as HTMLElement;
            currentWizardData = { ...currentWizardData, ...collectWizardStepData(currentStep.id) }; // Save current step data before going back
            updateWizardSummary();
            switchWizardStep(btn.dataset.prev!);
        });
    });
    document.querySelectorAll<HTMLButtonElement>('.wizard-ai-tip-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const step = btn.dataset.step;
            let prompt = "";
            let resultBoxId = `wizard-step-${step}-ai-result`;
            if (step === "1") prompt = "Provide 2 brief AI tips for effective client communication when starting a new landscaping quote, focusing on building rapport and understanding needs.";
            else if (step === "2") prompt = "Give 2 AI tips for defining job scope clearly and suggesting potential upsells for common landscaping jobs (e.g. spring cleanup, lawn maintenance).";
            else if (step === "3") { /* AI Estimate Costs button, handled separately */ return; } 
            else if (step === "4") prompt = `A landscaper has provided some detailed costs: "${getTextareaValue('wizard-detailed-costs') || 'No specific costs yet'}". Offer 1-2 AI suggestions for potential cost savings or efficiency improvements based on these items, or general advice if items are sparse. Focus on materials or rentals.`;
            
            if(prompt) await callGeminiAPI(prompt, resultBoxId);
        });
    });
    getElementByIdOrThrow('wizard-ai-estimate-costs-btn').addEventListener('click', handleAiEstimateCosts);
    getElementByIdOrThrow('wizard-save-quote-btn').addEventListener('click', () => handleFinalizeWizard('saveQuote'));
    getElementByIdOrThrow('wizard-log-job-btn').addEventListener('click', () => handleFinalizeWizard('logJob'));
    getElementByIdOrThrow('wizard-reset-btn').addEventListener('click', resetWizard);
    
    // Auto-update summary on revenue change in wizard
    getElementByIdOrThrow('wizard-revenue').addEventListener('input', () => {
        currentWizardData.revenue = getInputValueAsNumber('wizard-revenue');
        updateWizardSummary();
    });


    // Quote Request Form (Manual)
    getElementByIdOrThrow('log-quote-request-form').addEventListener('submit', handleAddQuoteRequest);

    // Session Job Log Analysis
    getElementByIdOrThrow('analyze-session-btn').addEventListener('click', () => {
        if (loggedJobs.length === 0) {
            displayInResultBox('session-analysis-result', "No jobs logged in this session to analyze. Please log some jobs first using the wizard.", 'info');
            return;
        }
        const jobSummary = loggedJobs.map(j => `- ${j.jobType} for ${j.clientName} (Revenue: $${j.revenue}, Profit: $${j.profit}, Margin: ${j.margin.toFixed(1)}%, Status: ${j.status})`).join('\n');
        const prompt = `Analyze the following list of landscaping jobs from my current session. Provide insights on overall performance, highlight any profitable or problematic jobs/trends, and offer 1-2 suggestions for improvement or focus based on this data:\n${jobSummary}\nOverall session: ${getElementByIdOrThrow('session-summary-details').innerText}`;
        callGeminiAPI(prompt, 'session-analysis-result');
    });

    // Calendar Navigation
    getElementByIdOrThrow('prev-month-btn').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
    getElementByIdOrThrow('next-month-btn').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });
    getElementByIdOrThrow('get-calendar-ai-tips-btn').addEventListener('click', () => {
         const prompt = `It's ${currentCalendarDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}. Provide 2-3 AI-powered scheduling tips for a landscaping business for the current week. Consider potential weather for ${getSeason()}, optimal times for certain tasks, and route efficiency if multiple jobs are common.`;
        callGeminiAPI(prompt, 'calendar-ai-tips-result');
    });

    // Map & Routes Page
    getElementByIdOrThrow('get-location-tips-btn').addEventListener('click', () => {
        const locations = getTextareaValue('job-locations-list');
        if (!locations) {
            displayInResultBox('location-tips-result', 'Please enter some job locations or areas of operation first.', 'info');
            return;
        }
        const prompt = `For a landscaping business operating in these locations/areas: "${locations}", provide:
1.  2-3 tips for efficient routing if these were jobs for a single day or week.
2.  1-2 suggestions for hyper-local advertising or marketing focus based on these areas (e.g., if many are residential, or a specific neighborhood is mentioned).`;
        callGeminiAPI(prompt, 'location-tips-result');
    });

    // AI Insights Page
    getElementByIdOrThrow('get-business-tips-btn').addEventListener('click', () => callGeminiAPI(seasonalBusinessTipsPrompt(), 'business-tips-result'));
    getElementByIdOrThrow('get-seasonal-services-btn').addEventListener('click', () => callGeminiAPI(seasonalServiceFocusPrompt(), 'seasonal-services-result'));
    getElementByIdOrThrow('get-insights-market-pulse-btn').addEventListener('click', () => callGeminiAPI(marketPulsePrompt(), 'insights-market-pulse-result'));

    // Daily Review Page
    getElementByIdOrThrow('get-daily-review-btn').addEventListener('click', () => {
        const summary = getTextareaValue('daily-summary');
        const prompt = `Here's a landscaper's daily summary: "${summary || 'No specific summary provided, just a general day.'}". Provide a brief, constructive "Daily Review" (2-3 sentences) focusing on positives and one gentle suggestion for improvement or reflection, or a motivational comment if the summary is sparse.`;
        callGeminiAPI(prompt, 'daily-review-result');
    });

    // Community Q&A Page
    getElementByIdOrThrow('ask-community-btn').addEventListener('click', () => {
        const question = getTextareaValue('community-question');
        if (!question) {
            displayInResultBox('community-qa-result', 'Please type your question first.', 'info');
            return;
        }
        const prompt = `A landscaping business owner/operator asked the following question to an AI simulating a helpful community of peers and experts: "${question}". Provide a comprehensive, empathetic, and actionable answer as if from this knowledgeable community. Address the core of the question and offer practical advice or different perspectives.`;
        callGeminiAPI(prompt, 'community-qa-result');
    });
}

// --- Initial App Setup ---
function initializeApp() {
    if (!apiKey) {
        // Warning already shown, further app functionality might be limited.
        // Disable AI buttons or show persistent warning
        document.querySelectorAll('.ai-action-button, .ai-action-button-alt, .wizard-ai-tip-btn').forEach(btn => {
            (btn as HTMLButtonElement).disabled = true;
            (btn as HTMLElement).title = "AI features disabled due to missing API key.";
        });
    }

    getElementByIdOrThrow<HTMLParagraphElement>('current-season').textContent = `Current Season: ${getSeason()}`;
    setupEventListeners();
    switchPage('dashboard-page'); // Start on dashboard
    renderCalendar();
    renderQuoteRequests();
    renderLoggedJobsAndSummary();
    resetWizard(); // Initialize wizard to default state and hide schedule date
    updateWizardSummary(); // Initial call to set up the summary box correctly
    
    // Ensure schedule date is hidden by default when page loads, unless wizard is on step 5
    if (!document.getElementById('wizard-step-5')?.classList.contains('active-step')) {
         getElementByIdOrThrow('wizard-scheduled-date-container').style.display = 'none';
    }
     getElementByIdOrThrow('wizard-profit-margin-bar-container').style.display = 'none'; // Initially hidden
}

// --- Run Application ---
initializeApp();