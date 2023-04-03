import { Log, PrismaClient } from "@prisma/client";
import { prisma } from "lib/prisma";
import { sanitizeAddress } from "lib/sanitizeAddress";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    ok: boolean;
    logs?: Log[];
    todaysLogCount?: number;
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

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const todaysLogCount = modifiedLogs.filter((log) => {
    const logDate = new Date(log.createdAt);
    return (
      logDate.getFullYear() === today.getFullYear() &&
      logDate.getMonth() === today.getMonth() &&
      logDate.getDate() === today.getDate()
    );
  }).length;

  res.status(200).json({ ok: true, logs: modifiedLogs, todaysLogCount });
}
