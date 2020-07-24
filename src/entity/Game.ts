import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';
import * as crypto from 'crypto';
import { User } from './User';
import { Score } from './Score';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  name: string;

  @Column()
  @Length(4, 100)
  apiKey: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.games)
  user: User;

  @OneToMany((type) => Score, (score) => score.game)
  scores: Score[];

  generateKey() {
    this.apiKey = crypto.randomBytes(20).toString('hex');
  }
}
