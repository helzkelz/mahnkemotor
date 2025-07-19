#!/bin/bash

# Firebase Functions Deployment Script
# This script builds and deploys Firebase Functions for payment processing

echo "🚀 Starting Firebase Functions deployment for payment processing..."

# Build the functions
echo "📦 Building Firebase Functions..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Firebase
echo "🔄 Deploying to Firebase..."
firebase deploy --only functions

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🎉 Payment endpoints are now live!"
else
    echo "❌ Deployment failed. Please check the logs."
    exit 1
fi

echo "📋 Available endpoints:"
echo "  - stripePayment"
echo "  - paypalPayment"
echo "  - cashappPayment"
echo "  - kofiSupport"
echo "  - kickstarterPledge"
echo "  - helloWorld"
echo ""
echo "🔧 Don't forget to configure your environment variables using:"
echo "  firebase functions:config:set [key]=[value]"
