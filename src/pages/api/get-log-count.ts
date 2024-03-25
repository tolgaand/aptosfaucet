import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    ok: boolean;
    logCount?: number;
  }>
) {
  if (req.method !== "GET") return res.status(405).json({ ok: false });

  const logCount = await prisma.log.count();

  res.status(200).json({ ok: true, logCount });
}
