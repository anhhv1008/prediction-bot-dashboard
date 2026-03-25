"use server";

import { initializeDB } from "@/database/DataSource";
import { WalletExchangeApi } from "@/database/entities/WalletExchangeApi";
import { revalidatePath } from "next/cache";
import { CryptoUtil } from "@/lib/crypto";

export async function getWalletExchangeApis() {
  const db = await initializeDB();
  const repo = db.getRepository(WalletExchangeApi);
  // Hide secret/passphrase and IVs/AuthTags on the read
  const apis = await repo.find({ order: { id: "DESC" } });
  
  return apis.map(a => ({
    id: a.id,
    walletId: a.walletId,
    exchange: a.exchange,
    key: a.key,
  }));
}

export async function saveWalletExchangeApi(data: Partial<WalletExchangeApi> & { plainSecret?: string; plainPassphrase?: string }) {
  const db = await initializeDB();
  const repo = db.getRepository(WalletExchangeApi);
  
  const now = Date.now();
  const updateData: Partial<WalletExchangeApi> = {
    walletId: data.walletId,
    exchange: data.exchange,
    key: data.key,
    updatedAt: now,
  };

  if (data.plainSecret) {
    const encSecret = CryptoUtil.encryptUtf8(data.plainSecret);
    updateData.secret = encSecret.ciphertextB64;
    updateData.secretIv = encSecret.ivB64;
    updateData.secretAuthTag = encSecret.authTagB64;
  }

  if (data.plainPassphrase) {
    const encPassphrase = CryptoUtil.encryptUtf8(data.plainPassphrase);
    updateData.passphrase = encPassphrase.ciphertextB64;
    updateData.passphraseIv = encPassphrase.ivB64;
    updateData.passphraseAuthTag = encPassphrase.authTagB64;
  }

  if (data.id) {
    const existing = await repo.findOneBy({ id: data.id });
    if (existing) {
      repo.merge(existing, updateData);
      await repo.save(existing);
    }
  } else {
    // Creating new
    if (!data.plainSecret) {
      throw new Error("Secret is required when creating a new API connection");
    }
    const newApi = repo.create({
      ...updateData,
      createdAt: now,
    });
    
    // Safety check: Fill passphraseIv with something if plainPassphrase was empty but db requires it
    if (!updateData.passphraseIv) {
       const fakePassphrase = CryptoUtil.encryptUtf8("");
       newApi.passphraseIv = fakePassphrase.ivB64;
       newApi.passphraseAuthTag = fakePassphrase.authTagB64;
    }

    await repo.save(newApi);
  }

  revalidatePath("/wallet-exchange-apis");
  return { success: true };
}

export async function deleteWalletExchangeApi(id: number) {
  const db = await initializeDB();
  const repo = db.getRepository(WalletExchangeApi);
  
  const existing = await repo.findOneBy({ id });
  if (existing) {
    await repo.remove(existing);
  }

  revalidatePath("/wallet-exchange-apis");
}
