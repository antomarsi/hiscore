import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  Generated,
  AfterInsert,
  BaseEntity
} from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'
import { User } from './user'
import { Leaderboard } from './leaderboard'
import { sign } from 'jsonwebtoken'
import auth from '../services/auth'
import { Field, ID } from 'type-graphql'

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ nullable: false })
  @Length(4, 20)
  @Field()
  name!: string

  @Column()
  @Length(0, 256)
  @Field()
  description!: string

  @Column({ nullable: false })
  @Generated('uuid')
  @Field()
  apiKey!: string

  @Column({ type: 'bool', default: false })
  @Field()
  useAuthentication: boolean = false

  @Column({ type: 'bool', default: false })
  @Field()
  favorited: boolean = false

  @Column()
  @CreateDateColumn()
  createdAt!: Date

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date

  @IsNotEmpty()
  @ManyToOne(() => User, user => user.games, { nullable: false })
  user!: User

  @OneToMany(() => Leaderboard, leaderboard => leaderboard.game, {
    cascade: true
  })
  @Field()
  leaderboards!: Leaderboard[]

  @AfterInsert()
  setApiKey() {
    this.apiKey = sign({ id: this.id }, auth.secret)
  }
}
