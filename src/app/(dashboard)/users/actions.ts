"use server";

import { initializeDB } from "@/database/DataSource";
import { User } from "@/database/entities/User";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const db = await initializeDB();
  const repo = db.getRepository(User);
  const users = await repo.find({ order: { id: "DESC" } });
  
  return users.map(user => ({
    id: user.id,
    telegramId: user.telegramId,
    username: user.username,
    fullName: user.fullName,
    socketAuthenticationCode: user.socketAuthenticationCode,
  }));
}

export async function saveUser(data: Partial<User>) {
  const db = await initializeDB();
  const repo = db.getRepository(User);
  
  const now = Date.now();
  if (data.id) {
    const existing = await repo.findOneBy({ id: data.id });
    if (existing) {
      repo.merge(existing, { ...data, updatedAt: now });
      await repo.save(existing);
    }
  } else {
    // Create new
    const newUser = repo.create({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    await repo.save(newUser);
  }

  revalidatePath("/users");
  return { success: true };
}

export async function deleteUser(id: number) {
  const db = await initializeDB();
  const repo = db.getRepository(User);
  
  const existing = await repo.findOneBy({ id });
  if (existing) {
    await repo.remove(existing);
  }

  revalidatePath("/users");
}
