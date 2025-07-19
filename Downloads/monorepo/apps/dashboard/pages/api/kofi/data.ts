import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;
  const token = process.env.KO_FI_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Ko-fi token not configured' });
  }

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Ko-fi doesn't have a public API for fetching user data
    // This is a placeholder for when they do, or for custom webhook data
    
    // For now, return mock data or data from your own database
    // where you might store Ko-fi webhook data
    
    const response = {
      goal: 1000,
      current: 250,
      supporters: 15
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Ko-fi API error:', error);
    res.status(500).json({ error: 'Failed to fetch Ko-fi data' });
  }
}
