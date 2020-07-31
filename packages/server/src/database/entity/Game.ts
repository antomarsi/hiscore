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
import * as crypto from 'crypto'
import { User } from './User'
import { Score } from './Score'
import * as jwt from 'jsonwebtoken'

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

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, user => user.games)
  user: User

  @OneToMany(type => Score, score => score.game)
  scores: Score[]
}
