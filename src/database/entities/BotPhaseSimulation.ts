import {
  Exchange,
  PhaseStatus,
} from "@Types/Business";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BotOrderSimulation } from "./BotOrderSimulation";

@Entity("bot_phases_simulation")
export class BotPhaseSimulation {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "signal_id", type: "int" })
  signalId: number;

  @Column({ name: "wallet_exchange_api_id", type: "int" })
  walletExchangeApiId: number;

  @Column({ name: "worker_id", type: "int" })
  workerId: number;

  @Column({ name: "exchange", type: "varchar", enum: Exchange })
  exchange: Exchange;

  @Column({ name: "signal_config", type: "json" })
  signalConfig: any;

  @Column({ name: "phase_config", type: "json" })
  phaseConfig: any;

  @Column({ name: "status", type: "varchar", enum: PhaseStatus })
  status: PhaseStatus;

  @Column({ name: "created_at", type: "bigint" })
  createdAt: number;

  @Column({ name: "updated_at", type: "bigint" })
  updatedAt: number;

  @OneToMany(() => BotOrderSimulation, (order) => order.phase)
  orders: BotOrderSimulation[];
}
