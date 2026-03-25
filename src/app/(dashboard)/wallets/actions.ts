"use server";

import { initializeDB } from "@/database/DataSource";
import { Wallet } from "@/database/entities/Wallet";
import { revalidatePath } from "next/cache";
import { CryptoUtil } from "@/lib/crypto";
import { Like } from "typeorm";

function normalizePrivateKey(input: string): string {
  const k = input.trim();
  const no0x = k.startsWith("0x") ? k.slice(2) : k;

  if (!/^[0-9a-fA-F]{64}$/.test(no0x)) {
    throw new Error("Invalid private key format. Expected 64 hex chars (optionally prefixed with 0x).");
  }
  return no0x.toLowerCase();
}

export async function getWallets() {
  const db = await initializeDB();
  const repo = db.getRepository(Wallet);
  const wallets = await repo.find({ order: { id: "DESC" } });
  
  return wallets.map(w => ({
    id: w.id,
    telegramUserId: w.telegramUserId,
    name: w.name,
  }));
}

export async function searchWallets(query: string) {
  const db = await initializeDB();
  const repo = db.getRepository(Wallet);
  if (!query) return [];

  const wallets = await repo.find({
    where: [
      { name: Like(`%${query}%`) },
      ...(isNaN(Number(query)) ? [] : [{ id: Number(query) }])
    ],
    take: 10,
    order: { id: "DESC" }
  });

  return wallets.map(w => ({
    id: w.id,
    name: w.name,
    telegramUserId: w.telegramUserId,
  }));
}

export async function saveWallet(data: Partial<Wallet> & { privateKey?: string }) {
  const db = await initializeDB();
  const repo = db.getRepository(Wallet);
  
  const now = Date.now();
  const updateData: Partial<Wallet> = {
    name: data.name,
    telegramUserId: data.telegramUserId,
    updatedAt: now,
  };

  if (data.privateKey) {
    const normalized = normalizePrivateKey(data.privateKey);
    const enc = CryptoUtil.encryptUtf8(normalized);
    updateData.encryptedPrivateKey = enc.ciphertextB64;
    updateData.iv = enc.ivB64;
    updateData.authTag = enc.authTagB64;
  }

  if (data.id) {
    const existing = await repo.findOneBy({ id: data.id });
    if (existing) {
      repo.merge(existing, updateData);
      await repo.save(existing);
    }
  } else {
    // Creating new
    if (!data.privateKey) {
      throw new Error("Private key is required when creating a new wallet");
    }
    const newWallet = repo.create({
      ...updateData,
      createdAt: now,
    });
    await repo.save(newWallet);
  }

  revalidatePath("/wallets");
  return { success: true };
}

export async function deleteWallet(id: number) {
  const db = await initializeDB();
  const repo = db.getRepository(Wallet);
  
  const existing = await repo.findOneBy({ id });
  if (existing) {
    await repo.remove(existing);
  }

  revalidatePath("/wallets");
}
