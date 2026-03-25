import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("redeem_histories")
export class RedeemHistory {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "wallet_id", type: "int", unsigned: true })
  walletId: number;

  @Column({ name: "condition_id", type: "varchar", length: 66 })
  conditionId: string;

  @Column({ name: "winning_token_id", type: "varchar", nullable: true })
  winningTokenId: string;

  @Column({ name: "winning_token_side", type: "varchar", nullable: true })
  winningTokenSide: string;

  @Column({ name: "status", type: "varchar" })
  status: string;

  @Column({ name: "txid", type: "varchar", nullable: true })
  txid: string;

  @Column({ name: "error_message", type: "text", nullable: true })
  errorMessage: string;

  @CreateDateColumn({ name: "created_at", type: "bigint" })
  createdAt: number;

  @UpdateDateColumn({ name: "updated_at", type: "bigint" })
  updatedAt: number;
}
