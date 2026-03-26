import {
  DipArbitrageSignalType,
  Exchange,
  OrderSide,
  OrderStatus,
  TokenSide,
} from "@Types/Business";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BotPhaseSimulation } from "./BotPhaseSimulation";

@Entity({ name: "bot_orders_simulation" })
export class BotOrderSimulation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "worker_id", type: "int" })
  workerId: number;

  @Column({ name: "signal_id", type: "int" })
  signalId: number;

  @Column({ name: "phase_id", type: "int" })
  phaseId?: number;

  @Column({ name: "wallet_exchange_api_id", type: "int" })
  walletExchangeApiId: number;

  @Column({ name: "token_id", type: "varchar" })
  tokenId: string;

  @Column({ name: "exchange", type: "varchar", enum: Exchange })
  exchange: Exchange;

  @Column({ name: "exchange_order_id", type: "varchar" })
  exchangeOrderId?: string;

  @Column({ name: "token_side", type: "varchar", enum: TokenSide })
  tokenSide: TokenSide;

  @Column({ type: "varchar", enum: OrderSide })
  side: OrderSide;

  @Column({ type: "varchar", enum: DipArbitrageSignalType })
  type: DipArbitrageSignalType;

  @Column({
    type: "double",
    precision: 30,
    scale: 10,
    nullable: true,
  })
  price: string;

  @Column({
    name: "executed_price",
    type: "double",
    precision: 30,
    scale: 10,
    nullable: true,
  })
  executedPrice: string;

  @Column({
    type: "double",
    precision: 30,
    scale: 10,
    nullable: true,
  })
  quantity: string;

  @Column({
    type: "double",
    precision: 30,
    scale: 10,
    nullable: true,
  })
  amount: string;

  @Column({
    name: "executed_quantity",
    type: "double",
    precision: 30,
    scale: 10,
    nullable: true,
  })
  executedQuantity: string;

  @Column({
    name: "received_quantity",
    type: "double",
    precision: 30,
    scale: 10,
    nullable: true,
  })
  receivedQuantity: string;

  @Column({
    type: "double",
    precision: 30,
    scale: 10,
    nullable: true,
  })
  pnl?: string;

  @Column({
    name: "pnl_amount",
    type: "double",
    precision: 30,
    scale: 10,
    nullable: true,
  })
  pnlAmount?: string;

  @Column({ type: "varchar", enum: OrderStatus })
  status: OrderStatus;

  @Column({
    name: "error_message",
    type: "varchar",
    nullable: true,
  })
  errorMessage?: string;

  @Column({
    name: "executed_at",
    nullable: true,
  })
  executedAt: number;

  @Column({ name: "created_at" })
  createdAt: number;

  @Column({ name: "updated_at" })
  updatedAt: number;

  @ManyToOne(() => BotPhaseSimulation, (phase) => phase.orders)
  @JoinColumn({ name: "phase_id" })
  phase: BotPhaseSimulation;
}
