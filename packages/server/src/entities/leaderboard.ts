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
import { Length } from 'class-validator'
import { Score } from './score'
import { Game } from './game'
import { Field, ID } from 'type-graphql'

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
export class Leaderboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ nullable: false })
  @Length(4, 20)
  @Field()
  name!: string

  @Column({
    type: 'enum',
    enum: SAVE_METHODS,
    default: SAVE_METHODS.HIGHEST
  })
  @Field()
  saveMethod!: SAVE_METHODS

  @Column({
    type: 'enum',
    enum: RESET_METHOD,
    nullable: true
  })
  @Field()
  resetMethod!: RESET_METHOD

  @Column()
  @CreateDateColumn()
  createdAt!: Date

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => Game, user => user.leaderboards, {
    onDelete: 'CASCADE',
    nullable: false
  })
  game!: Game

  @OneToMany(() => Score, score => score.leaderboard)
  scores!: Score[]
}
