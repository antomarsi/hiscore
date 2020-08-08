import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { Length, Allow } from 'class-validator'
import { Score } from './Score'
import { Game } from './Game'

export enum SAVE_METHODS {
  LATEST = 'LATEST',
  HIGHEST = 'HIGHEST'
}
export enum RESET_METHOD {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY'
}

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn()
  id: number

  @Allow()
  @Column({ nullable: false })
  @Length(4, 20)
  name: string

  @Allow()
  @Column({
    type: 'enum',
    enum: SAVE_METHODS,
    default: SAVE_METHODS.HIGHEST
  })
  saveMethod: SAVE_METHODS

  @Allow()
  @Column({
    type: 'enum',
    enum: RESET_METHOD,
    nullable: true
  })
  resetMethod: RESET_METHOD

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => Game, user => user.leaderboards, {
    onDelete: 'CASCADE',
    nullable: false
  })
  game: Game

  @OneToMany(type => Score, score => score.leaderboard)
  scores: Score[]
}
