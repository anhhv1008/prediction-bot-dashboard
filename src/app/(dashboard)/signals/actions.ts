"use server";

import { initializeDB } from "@/database/DataSource";
import { BotSignalConfig } from "@/database/entities/BotSignalConfig";
import { publishEvent } from "@/lib/redis";
import { RedisNotificationChannel, RedisNotificationEvent, SignalConfigStatus } from "@Types/Business";
import { revalidatePath } from "next/cache";

export async function getSignals() {
  const db = await initializeDB();
  const configs = await db.getRepository(BotSignalConfig).find({ order: { id: "DESC" } });
  
  return configs.map(config => ({
    id: config.id,
    name: config.name,
    indicator: config.indicator,
    indicatorConfig: config.indicatorConfig,
    status: config.status,
    createdAt: config.createdAt,
    updatedAt: config.updatedAt,
  }));
}

export async function saveSignal(data: Partial<BotSignalConfig>) {
  const db = await initializeDB();
  const repo = db.getRepository(BotSignalConfig);
  
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
      status: data.status || SignalConfigStatus.Active,
      createdAt: now,
      updatedAt: now,
    });
    saved = await repo.save(newConfig);
  }

  // Publish Redis Event to Bot
  if (saved) {
     await publishEvent(RedisNotificationChannel.BotSignal, {
       event: data.id ? RedisNotificationEvent.BotSignalConfigUpdated : RedisNotificationEvent.BotSignalConfigCreated,
       data: saved
     });
  }

  revalidatePath("/signals");
  return { success: true };
}

export async function deleteSignal(id: number) {
  const db = await initializeDB();
  const repo = db.getRepository(BotSignalConfig);
  
  const existing = await repo.findOneBy({ id });
  if (existing) {
    await repo.remove(existing);
    await publishEvent(RedisNotificationChannel.BotSignal, {
      event: RedisNotificationEvent.BotSignalConfigDeleted,
      data: { id }
    });
  }

  revalidatePath("/signals");
}
