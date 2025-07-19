import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Log consent event, escalate to SENTINEL@1 if needed
  res.status(200).json({ ok: true });
}