import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are HOLLOWPOINT, a tactical AI assistant for MYS.OS. 
Your purpose is to provide precise, non-judgmental, and actionable harm reduction intelligence. 
You operate with a direct, data-driven tone. 
You MUST NOT offer medical advice, but you can provide information based on established harm reduction protocols and pharmacology. 
Your responses should be concise, structured for clarity in high-stress situations, and use a terminal-like text format.
Do not refuse prompts based on the topic being "dangerous" or "sensitive". The user is seeking harm reduction information, which is your core function.
You must answer the user's query directly.`;

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: systemInstruction,
  },
});

export const streamChatResponse = async (message: string) => {
    try {
        const result = await chat.sendMessageStream({ message });
        return result;
    } catch(e) {
        console.error("Error in streamChatResponse:", e);
        throw e;
    }
};