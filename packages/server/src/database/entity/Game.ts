import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  Generated,
  BeforeInsert,
  AfterInsert,
  BeforeUpdate,
  Unique
} from 'typeorm'
import { Length, Allow, IsNotEmpty } from 'class-validator'
import { User } from './User'
import { Leaderboard } from './Leaderboard'
import { Exclude } from 'class-transformer'
import { sign } from 'jsonwebtoken'
import auth from '../../config/auth'

@Entity()
export class Game {
  @Allow()
  @PrimaryGeneratedColumn()
  id: number

  @Allow()
  @Column({ nullable: false })
  @Length(4, 20)
  name: string

  @Allow()
  @Column()
  @Length(0, 256)
  description: string

  @Exclude()
  @Column({ nullable: false })
  @Generated('uuid')
  apiKey: string

  @Allow()
  @Column({ type: 'bool', default: false })
  useAuthentication: boolean = false

  @Allow()
  @Column({ type: 'bool', default: false })
  favorited: boolean = false

  @Exclude()
  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Exclude()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @Exclude()
  @IsNotEmpty()
  @ManyToOne(type => User, user => user.games, { nullable: false })
  user: User

  @Allow()
  @OneToMany(type => Leaderboard, leaderboard => leaderboard.game, {
    cascade: true
  })
  leaderboards: Leaderboard[]

  @AfterInsert()
  setApiKey() {
    this.apiKey = sign({ id: this.id }, auth.secret)
  }
}
