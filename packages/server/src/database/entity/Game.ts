import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  Generated
} from 'typeorm'
import { Length } from 'class-validator'
import { User } from './User'
import { Leaderboard } from './Leaderboard'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(4, 20)
  name: string

  @Column()
  @Generated('uuid')
  apiKey: string

  @Column({ type: 'bool', default: false })
  useAuthentication: boolean = false

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, user => user.games)
  user: User

  @OneToMany(type => Leaderboard, leaderboard => leaderboard.game)
  leaderboards: Leaderboard[]
}
