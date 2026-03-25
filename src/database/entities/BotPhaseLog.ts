import { BotPhaseLogTitle } from "@Types/Business";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bot_phase_logs")
export class BotPhaseLog {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ name: "worker_id", type: "int" })
  workerId: number;

  @Column({ name: "phase_id", type: "int" })
  phaseId: number;

  @Column({ name: "log_title", type: "varchar", length: 255 })
  logTitle: BotPhaseLogTitle;

  @Column({ name: "log_data", type: "json", nullable: true })
  logData: any;

  @Column({ name: "created_at", type: "bigint" })
  createdAt: number;
}
