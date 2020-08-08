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
@Unique(['user', 'name'])
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

  @Exclude()
  @OneToMany(type => Leaderboard, leaderboard => leaderboard.game)
  leaderboards: Leaderboard[]

  @AfterInsert()
  setApiKey() {
    this.apiKey = sign({ id: this.id }, auth.secret)
  }
}
