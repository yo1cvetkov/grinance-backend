import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "../accounts/account.entity";
import { InsightType } from "./insight-type.enum";

@Entity()
export class AIInsight {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: InsightType,
    default: InsightType.BUDGETING_RECOMMENDATIONS,
  })
  insightType: InsightType;

  @Column({ nullable: false })
  insightDetails: string;

  @CreateDateColumn()
  dateGenerated: Date;

  @Column({ type: "boolean", default: false })
  isImportant: boolean;

  @ManyToOne(() => Account, (account) => account.aiInsights)
  @JoinColumn({ name: "account_id" })
  account: Account;
}
