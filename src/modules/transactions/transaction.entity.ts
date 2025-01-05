import { ChildEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";
import { Account } from "../accounts/account.entity";
import { Category } from "../categories/category.entity";
import { TransactionType } from "./transaction-type.enum";
import { FrequencyType } from "./frequency-type.enum";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity()
export class OneTimeTransaction extends Transaction {
  @Column({
    type: "enum",
    enum: TransactionType,
    default: TransactionType.EXPENSE,
  })
  type: TransactionType;

  @Column("date")
  transactionDate: Date;
}

@ChildEntity()
export class RecurringTransaction extends Transaction {
  @Column({
    type: "enum",
    enum: FrequencyType,
    default: FrequencyType.MONTHLY,
  })
  frequency: FrequencyType;

  @Column("date")
  nextDueDate: Date;
}
