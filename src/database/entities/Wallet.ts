import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("wallets")
export class Wallet {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "telegram_user_id", type: "bigint", unsigned: true })
  telegramUserId: number;

  @Column({ name: "name", type: "varchar", length: 64 })
  name: string;

  @Column({ name: "encrypted_private_key", type: "text" })
  encryptedPrivateKey: string; // base64

  @Column({ name: "iv", type: "varchar", length: 32 })
  iv: string; // base64

  @Column({ name: "auth_tag", type: "varchar", length: 32 })
  authTag: string; // base64

  @Column({ name: "created_at", type: "bigint" })
  createdAt: number;

  @Column({ name: "updated_at", type: "bigint" })
  updatedAt: number;
}
