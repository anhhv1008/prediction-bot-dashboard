import {
  SignalConfigStatus,
  SignalDipArbitrageIndicatorConfig,
  SignalDipArbitrageVWAPIndicatorConfig,
  SignalWinningSideIndicatorConfig,
  SignalIndicator,
} from "@Types/Business";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bot_signal_configs")
export class BotSignalConfig {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "user_id", type: "int", unsigned: true })
  userId: number;

  @Column({ name: "name", type: "varchar", length: "255" })
  name: string;

  @Column({ name: "indicator", type: "varchar", enum: SignalIndicator })
  indicator: SignalIndicator;

  @Column({ name: "indicator_config", type: "json" })
  indicatorConfig: SignalDipArbitrageIndicatorConfig | SignalDipArbitrageVWAPIndicatorConfig | SignalWinningSideIndicatorConfig;

  @Column({ name: "status", type: "varchar", enum: SignalConfigStatus })
  status: SignalConfigStatus;

  @Column({ name: "created_at", type: "bigint" })
  createdAt: number;

  @Column({ name: "updated_at", type: "bigint" })
  updatedAt: number;
}
