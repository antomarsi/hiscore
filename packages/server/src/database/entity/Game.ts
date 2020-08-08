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
import { Exclude } from 'class-transformer'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(4, 20)
  name: string

  @Column()
  @Length(0, 256)
  description: string

  @Column()
  @Generated('uuid')
  apiKey: string

  @Column({ type: 'bool', default: false })
  useAuthentication: boolean = false

  @Exclude()
  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Exclude()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @Exclude()
  @ManyToOne(type => User, user => user.games)
  user: User

  @Exclude()
  @OneToMany(type => Leaderboard, leaderboard => leaderboard.game)
  leaderboards: Leaderboard[]
}
