import { Exchange, WorkerConfigStatus } from "@Types/Business";
import type { BotWorkerConfig } from "@Types/Business";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bot_workers")
export class BotWorker {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "wallet_exchange_api_id", type: "int", unsigned: true })
  walletExchangeApiId: number;

  @Column({ name: "user_id", type: "bigint", unsigned: true })
  userId: number;

  @Column({
    name: "signal_ids",
    type: "varchar", // or any other string type
    transformer: {
      to: (value: number[]) => value.join(","),
      from: (value: string) =>
        value.split(",").map((signalId) => Number(signalId)),
    },
  })
  signalIds: number[];

  @Column({ name: "worker_config", type: "json" })
  workerConfig: BotWorkerConfig;

  @Column({ name: "status", type: "varchar", enum: WorkerConfigStatus })
  status: WorkerConfigStatus;

  @Column({ name: "created_at", type: "bigint" })
  createdAt: number;

  @Column({ name: "updated_at", type: "bigint" })
  updatedAt: number;
}
