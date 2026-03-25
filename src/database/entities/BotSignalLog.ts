import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bot_signal_logs")
export class BotSignalLog {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "signal_id", type: "int" })
  signalId: number;

  @Column({ name: "signal_log", type: "json" })
  signalLog: any;

  @Column({ name: "created_at", type: "bigint" })
  createdAt: number;
}
