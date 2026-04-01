"use server";

import { initializeDB } from "@/database/DataSource";
import { BotWorker } from "@/database/entities/BotWorker";
import { publishEvent } from "@/lib/redis";
import { RedisNotificationChannel, RedisNotificationEvent, WorkerConfigStatus } from "@Types/Business";
import { revalidatePath } from "next/cache";

export async function getWorkers() {
  const db = await initializeDB();
  const repo = db.getRepository(BotWorker);
  const configs = await repo.find({ order: { id: "DESC" } });
  
  return configs.map(config => ({
    id: config.id,
    walletExchangeApiId: config.walletExchangeApiId,
    userId: config.userId,
    signalIds: config.signalIds,
    workerConfig: config.workerConfig,
    workerState: config.workerState,
    status: config.status,
    createdAt: config.createdAt,
    updatedAt: config.updatedAt,
  }));
}

export async function saveWorker(data: Partial<BotWorker>) {
  const db = await initializeDB();
  const repo = db.getRepository(BotWorker);
  
  let saved;
  const now = Date.now();
  if (data.id) {
    const existing = await repo.findOneBy({ id: data.id });
    if (existing) {
      repo.merge(existing, { ...data, updatedAt: now });
      saved = await repo.save(existing);
    }
  } else {
    // Create new
    const newConfig = repo.create({
      ...data,
      status: data.status || WorkerConfigStatus.Active,
      createdAt: now,
      updatedAt: now,
    });
    saved = await repo.save(newConfig);
  }

  if (saved) {
     await publishEvent(RedisNotificationChannel.BotWorker, {
       event: data.id ? RedisNotificationEvent.BotWorkerUpdated : RedisNotificationEvent.BotWorkerCreated,
       data: saved
     });
  }

  revalidatePath("/workers");
  return { success: true };
}

export async function deleteWorker(id: number) {
  const db = await initializeDB();
  const repo = db.getRepository(BotWorker);
  
  const existing = await repo.findOneBy({ id });
  if (existing) {
    await repo.remove(existing);
    await publishEvent(RedisNotificationChannel.BotWorker, {
      event: RedisNotificationEvent.BotWorkerDeleted,
      data: { id }
    });
  }

  revalidatePath("/workers");
}
