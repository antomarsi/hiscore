import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity
} from 'typeorm'
import { Length, Allow } from 'class-validator'
import { Score } from './Score'
import { Game } from './Game'
import { Exclude } from 'class-transformer'

export enum RESET_METHOD {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY'
}

@Entity()
export class Leaderboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Allow()
  @Column({ nullable: false })
  @Length(4, 20)
  name: string

  @Allow()
  @Column({
    type: 'enum',
    enum: RESET_METHOD,
    nullable: true
  })
  resetMethod: RESET_METHOD

  @Exclude()
  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Exclude()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @Exclude()
  @ManyToOne(type => Game, user => user.leaderboards, {
    onDelete: 'CASCADE'
  })
  game: Game

  @OneToMany(type => Score, score => score.leaderboard)
  scores: Score[]
}
