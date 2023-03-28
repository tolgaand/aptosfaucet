import { Log, PrismaClient } from "@prisma/client";
import { prisma } from "lib/prisma";
import { sanitizeAddress } from "lib/sanitizeAddress";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    ok: boolean;
    logs?: Log[];
  }>
) {
  if (req.method !== "GET") return res.status(405).json({ ok: false });

  const logs = await prisma.log.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const modifiedLogs = logs.map((log) => ({
    ...log,
    walletAddress: sanitizeAddress(log.walletAddress),
  }));

  res.status(200).json({ ok: true, logs: modifiedLogs });
}
