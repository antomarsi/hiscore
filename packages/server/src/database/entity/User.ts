import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Game } from './Game'

@Entity()
@Unique(['googleId', 'githubId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  googleId: string

  @Column({ nullable: true })
  githubId: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(type => Game, game => game.user)
  games: Game[]
}
