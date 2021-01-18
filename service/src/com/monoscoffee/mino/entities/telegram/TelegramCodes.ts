import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@Unique(["code", "ref"])
@Entity({ name: "telegram_code", synchronize: true })
class TelegramCode extends BaseEntity {
  id(id: any) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn({ name: "telegram_code_id" })
  public telegramCodeId: number;

  @Column({ name: "code" })
  public code: string;

  @Column({ name: "type" })
  public type: "LOGIN" | "REGISTER";

  @Column({ name: "ref" })
  public ref: number;

  @Column({ name: "created_at" })
  public createdAt: Date;

  @Column({ name: "expired" })
  public expired: boolean = false;
}

export default TelegramCode;
