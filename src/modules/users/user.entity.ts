import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'date',
  })
  birthDate: Date;

  @Column({
    type: 'varchar',
  })
  password: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'activeAccountId' })
  activeAccount: Account;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @CreateDateColumn()
  createdAt: Date;
}
