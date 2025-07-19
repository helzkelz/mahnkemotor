import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const verificationToken = process.env.KO_FI_WEBHOOK_VERIFICATION_TOKEN;
  
  if (!verificationToken) {
    return res.status(500).json({ error: 'Webhook verification token not configured' });
  }

  try {
    const { data } = req.body;
    
    // Verify the webhook signature if Ko-fi provides one
    const providedSignature = req.headers['x-kofi-signature'];
    if (providedSignature) {
      const expectedSignature = crypto
        .createHmac('sha256', verificationToken)
        .update(JSON.stringify(data))
        .digest('hex');
      
      if (providedSignature !== expectedSignature) {
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    // Parse Ko-fi webhook data
    const kofiData = JSON.parse(data);
    
    // Handle different Ko-fi webhook types
    switch (kofiData.type) {
      case 'Donation':
        await handleDonation(kofiData);
        break;
      case 'Subscription':
        await handleSubscription(kofiData);
        break;
      case 'Commission':
        await handleCommission(kofiData);
        break;
      default:
        console.log('Unknown Ko-fi webhook type:', kofiData.type);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Ko-fi webhook error:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
}

async function handleDonation(data: any) {
  // Store donation data in your database
  console.log('Ko-fi donation received:', {
    amount: data.amount,
    currency: data.currency,
    from_name: data.from_name,
    message: data.message,
    url: data.url,
    email: data.email,
    timestamp: data.timestamp
  });
  
  // You might want to:
  // 1. Save to database
  // 2. Send thank you email
  // 3. Update goal progress
  // 4. Trigger notifications
}

async function handleSubscription(data: any) {
  // Handle Ko-fi subscription
  console.log('Ko-fi subscription received:', data);
}

async function handleCommission(data: any) {
  // Handle Ko-fi commission
  console.log('Ko-fi commission received:', data);
}
