import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "telegram_id", type: "bigint" })
  telegramId: number;

  @Column({ name: "username", type: "varchar", length: 64 })
  username: string;

  @Column({ name: "full_name", type: "varchar", length: 64 })
  fullName: string;

  @Column({
    name: "socket_authentication_code",
    type: "varchar",
    length: 64,
    nullable: true,
  })
  socketAuthenticationCode: string;

  @Column({ name: "created_at", type: "bigint" })
  createdAt: number;

  @Column({ name: "updated_at", type: "bigint" })
  updatedAt: number;

  @Column({ name: "deleted_at", type: "bigint", nullable: true })
  deletedAt: number | null;
}
