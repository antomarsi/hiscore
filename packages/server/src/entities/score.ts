import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Leaderboard } from './leaderboard'
import { Player } from './player'
import { MaxLength } from 'class-validator'
import { Field, ID } from 'type-graphql'

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @ManyToOne(() => Player, player => player.scores, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @Field()
  player!: Player

  @Column({ nullable: true })
  @MaxLength(20)
  @Field()
  player_name!: string

  @Column()
  @Field()
  score!: number

  @ManyToOne(() => Leaderboard, leaderboard => leaderboard.scores, {
    onDelete: 'CASCADE'
  })
  leaderboard!: Leaderboard
}
