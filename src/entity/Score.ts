import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Game } from './Game';

@Entity()
export class Score {
  @Column({ length: 20 })
  player: string;
  
  @Column()
  score: number;

  @ManyToOne((type) => Game, (game) => game.scores)
  game: Game;
}
