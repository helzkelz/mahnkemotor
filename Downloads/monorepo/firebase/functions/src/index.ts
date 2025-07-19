import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from 'axios';
import fetch from 'node-fetch';
import Stripe from 'stripe';
// import { PayPalHttpClient } from '@paypal/paypal-server-sdk'; // PayPal client import - needs proper setup

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Initialize payment providers
const stripe = new Stripe(functions.config().stripe.secret_key || '', {
    apiVersion: '2025-06-30.basil',
});

// PayPal client setup - uncomment and configure when ready
// const paypalClient = new PayPalHttpClient({
//     clientId: functions.config().paypal.client_id || '',
//     clientSecret: functions.config().paypal.client_secret || ''
// });

// Stripe endpoint
export const stripePayment = functions.https.onRequest(async (request, response) => {
    try {
        functions.logger.info("Processing Stripe payment", { structuredData: true });
        
        const { amount, currency = 'usd', paymentMethodId } = request.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method: paymentMethodId,
            confirm: true,
            return_url: 'https://your-app.com/return'
        });
        
        response.json({
            success: true,
            paymentIntent: paymentIntent
        });
    } catch (error) {
        functions.logger.error("Error processing Stripe payment", error);
        response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// PayPal endpoint
export const paypalPayment = functions.https.onRequest(async (request, response) => {
    try {
        functions.logger.info("Processing PayPal payment", { structuredData: true });
        
        const { amount, currency = 'USD' } = request.body;
        
        // Create PayPal order (simplified example)
        const order = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: amount.toString()
                }
            }]
        };
        
        // Note: You'll need to implement the actual PayPal order creation
        // const result = await paypalClient.execute(/* order creation request */);
        
        response.json({
            success: true,
            order: order
        });
    } catch (error) {
        functions.logger.error("Error processing PayPal payment", error);
        response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// CashApp endpoint (using REST API)
export const cashappPayment = functions.https.onRequest(async (request, response) => {
    try {
        functions.logger.info("Processing CashApp payment", { structuredData: true });
        
        const { amount, currency = 'USD', recipient } = request.body;
        
        // CashApp API call using axios
        const cashAppResponse = await axios.post('https://api.cash.app/v1/payments', {
            amount: amount,
            currency: currency,
            recipient: recipient
        }, {
            headers: {
                'Authorization': `Bearer ${functions.config().cashapp.access_token || ''}`,
                'Content-Type': 'application/json'
            }
        });
        
        response.json({
            success: true,
            payment: cashAppResponse.data
        });
    } catch (error) {
        functions.logger.error("Error processing CashApp payment", error);
        response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Crowdfunding (Ko-fi) endpoint
export const kofiSupport = functions.https.onRequest(async (request, response) => {
    try {
        functions.logger.info("Processing Ko-fi request", { structuredData: true });
        
        const { amount, message, supporter_name } = request.body;
        
        const kofiResponse = await fetch('https://api.ko-fi.com/v2/webhook', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${functions.config().kofi.access_token || ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount,
                message: message,
                supporter_name: supporter_name
            })
        });
        
        const data = await kofiResponse.json();
        
        response.json({
            success: true,
            support: data
        });
    } catch (error) {
        functions.logger.error("Error processing Ko-fi request", error);
        response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Kickstarter endpoint
export const kickstarterPledge = functions.https.onRequest(async (request, response) => {
    try {
        functions.logger.info("Processing Kickstarter pledge", { structuredData: true });
        
        const { project_id, amount, reward_id } = request.body;
        
        const kickstarterResponse = await axios.post('https://api.kickstarter.com/v1/pledges', {
            project_id: project_id,
            amount: amount,
            reward_id: reward_id
        }, {
            headers: {
                'Authorization': `Bearer ${functions.config().kickstarter.access_token || ''}`,
                'Content-Type': 'application/json'
            }
        });
        
        response.json({
            success: true,
            pledge: kickstarterResponse.data
        });
    } catch (error) {
        functions.logger.error("Error processing Kickstarter pledge", error);
        response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
