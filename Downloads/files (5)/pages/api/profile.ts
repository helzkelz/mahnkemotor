import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Unlock feature, update profile via profileDaemon@1
  res.status(200).json({ ok: true });
}