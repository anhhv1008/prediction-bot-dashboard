import { Exchange } from "@Types/Business";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("wallet_exchange_apis")
export class WalletExchangeApi {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "wallet_id", type: "int" })
  walletId: number;

  @Column({ name: "exchange", type: "varchar", enum: Exchange })
  exchange: Exchange;

  @Column({ name: "key", type: "varchar", length: 255 })
  key: string;

  @Column({ name: "secret", type: "text" })
  secret: string;

  @Column({ name: "passphrase", type: "text", nullable: true })
  passphrase: string;

  @Column({ name: "secret_iv", type: "char", length: 32 })
  secretIv: string;

  @Column({ name: "secret_auth_tag", type: "char", length: 32 })
  secretAuthTag: string;

  @Column({ name: "passphrase_iv", type: "char", length: 32 })
  passphraseIv: string;

  @Column({ name: "passphrase_auth_tag", type: "char", length: 32 })
  passphraseAuthTag: string;

  @Column({ name: "created_at", type: "bigint" })
  createdAt: number;

  @Column({ name: "updated_at", type: "bigint" })
  updatedAt: number;
}
