import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Game } from './Game'

@Entity({ orderBy: { order: 'DESC' } })
export class Score {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20 })
  player: string

  @Column()
  score: number

  @ManyToOne(type => Game, game => game.scores, { onDelete: 'CASCADE' })
  game: Game
}
