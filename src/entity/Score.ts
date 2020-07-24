import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 20 })
  player: string;
  @Column()
  score: number;
}
