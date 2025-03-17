// pages/api/rosca-payouts/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const payouts = await prisma.roscaPayout.findMany();
      res.status(200).json(payouts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payouts' });
    }
  } else if (req.method === 'POST') {
    const { roscaId, memberId, amount } = req.body;

    try {
      const payout = await prisma.roscaPayout.create({
        data: {
          roscaId,
          memberId,
          amount,
        },
      });
      res.status(201).json(payout);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create payout' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}