// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    ok: boolean;
  }>
) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const { walletAddress } = req.body;

  if (!walletAddress) return res.status(400).json({ ok: false });

  await prisma.log.create({
    data: {
      walletAddress,
    },
  });

  res.status(200).json({ ok: true });
}
