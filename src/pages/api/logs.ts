import { Log } from "@prisma/client";
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

  const logs = await prisma.log.groupBy({
    by: ["walletAddress"],
    _count: {
      walletAddress: true,
    },
    _max: {
      createdAt: true,
      id: true,
    },
  });

  const modifiedLogs = logs.map((log) => ({
    id: log._max.id as string,
    walletAddress: sanitizeAddress(log.walletAddress),
    count: log._count.walletAddress,
    lastActionAt: log._max.createdAt as Date,
  }));

  modifiedLogs.sort((a, b) => {
    if (!a.lastActionAt) return 1;
    if (!b.lastActionAt) return -1;
    return b.lastActionAt.getTime() - a.lastActionAt.getTime();
  });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const todaysLogCount = modifiedLogs.filter((log) => {
    if (!log.lastActionAt) return false;

    const logDate = new Date(log.lastActionAt);
    return (
      logDate.getFullYear() === today.getFullYear() &&
      logDate.getMonth() === today.getMonth() &&
      logDate.getDate() === today.getDate()
    );
  }).length;

  res.status(200).json({ ok: true, logs: modifiedLogs, todaysLogCount });
}
