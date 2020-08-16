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
  BaseEntity,
  JoinColumn,
  JoinTable,
  BeforeUpdate,
  UpdateEvent
} from 'typeorm'
import { Length, Allow, IsNotEmpty, ArrayMaxSize } from 'class-validator'
import { User } from './User'
import { Leaderboard } from './Leaderboard'
import { Exclude } from 'class-transformer'
import { sign } from 'jsonwebtoken'
import auth from '../../config/auth'

interface findByUserOptions {
  leaderboards: boolean
}
@Entity()
export class Game extends BaseEntity {
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
  @ArrayMaxSize(3)
  @OneToMany(type => Leaderboard, leaderboard => leaderboard.game, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinTable()
  leaderboards: Leaderboard[]

  @AfterInsert()
  setApiKey() {
    this.apiKey = sign({ id: this.id }, auth.secret)
  }

  static findByUser(user: User, options?: findByUserOptions): Promise<Game[]> {
    let query = this.createQueryBuilder('game')
      .innerJoin('game.user', 'user')
      .where('game.user.id = :user', { user: user.id })

    if (options?.leaderboards) {
      query.leftJoinAndSelect(
        'game.leaderboards',
        'leaderboard',
        'leaderboard.game.id = game.id'
      )
    }

    return query.getMany()
  }
}
