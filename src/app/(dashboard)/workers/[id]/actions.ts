"use server";

import { initializeDB } from "@/database/DataSource";
import { BotPhase } from "@/database/entities/BotPhase";
import { BotOrder } from "@/database/entities/BotOrder";
import BigNumber from "bignumber.js";
import { MoreThanOrEqual } from "typeorm";

export async function getWorkerDetails(workerId: number, page: number = 1, limit: number = 10) {
  const db = await initializeDB();
  const phaseRepo = db.getRepository(BotPhase);
  const orderRepo = db.getRepository(BotOrder);

  // Fetch paginated phases
  const [phases, total] = await phaseRepo.findAndCount({
    where: { workerId },
    order: { id: "DESC" },
    take: limit,
    skip: (page - 1) * limit,
  });

  // Attach orders to each phase
  for (const phase of phases) {
    phase.orders = await orderRepo.find({ where: { phaseId: phase.id }, order: { createdAt: "DESC" } });
  }

  // Calculate Daily PNL (Using last 7 days simplified)
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentOrders = await orderRepo.find({
    where: { workerId, createdAt: MoreThanOrEqual(sevenDaysAgo) }
  });

  const dailyPnL: Record<string, string> = {};

  for (const order of recentOrders) {
    if (order.status !== "executed") continue;
    const dateStr = new Date(order.executedAt || order.createdAt).toLocaleDateString();
    
    if (!dailyPnL[dateStr]) dailyPnL[dateStr] = "0";

    const price = new BigNumber(order.executedPrice || 0);
    const quantity = new BigNumber(order.executedQuantity || 0);
    const value = price.times(quantity);

    if (order.side === "sell") {
      dailyPnL[dateStr] = new BigNumber(dailyPnL[dateStr]).plus(value).toString();
    } else {
      dailyPnL[dateStr] = new BigNumber(dailyPnL[dateStr]).minus(value).toString();
    }
  }

  return {
    phases: JSON.parse(JSON.stringify(phases)),
    total,
    dailyPnL,
  };
}
