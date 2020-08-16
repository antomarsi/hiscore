import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity
} from 'typeorm'
import { Leaderboard } from './Leaderboard'
import { Player } from './Player'
import { MaxLength } from 'class-validator'

@Entity()
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Player, player => player.scores, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  player: Player

  @Column({nullable: true})
  @MaxLength(20)
  player_name: string;

  @Column()
  score: number

  @ManyToOne(type => Leaderboard, leaderboard => leaderboard.scores, {
    onDelete: 'CASCADE'
  })
  leaderboard: Leaderboard
}
