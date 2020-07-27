import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ObjectIdColumn } from 'typeorm';
import { Game } from './Game';

@Entity({orderBy: {order:"DESC"}})
export class Score {
  @ObjectIdColumn()
  id: number;
  @Column({ length: 20 })
  player: string;

  @Column()
  score: number;

  @ManyToOne((type) => Game, (game) => game.scores, { onDelete: 'CASCADE' })
  game: Game;
}
