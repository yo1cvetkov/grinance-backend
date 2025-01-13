import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Budget } from '../budgets/budget.entity';
import { Transaction } from '../transactions/transaction.entity';
import { User } from '../users/user.entity';
import { Currency } from './currency.enum';
import { AIInsight } from '../ai-insights/ai-insight.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
  })
  currency: Currency;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => Budget, (budget) => budget.account)
  budgets: Budget[];

  @OneToMany(() => AIInsight, (aiInsight) => aiInsight.account)
  aiInsights: AIInsight[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
