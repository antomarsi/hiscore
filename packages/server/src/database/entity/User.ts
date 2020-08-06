import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Game } from './Game'
import { Exclude } from "class-transformer"
import { SocialProvider } from './SocialProvider'

@Entity()
export class User{
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  displayName: string

  @Column()
  email: string

  @Exclude()
  @Column({select: false})
  @CreateDateColumn()
  createdAt: Date

  @Exclude()
  @Column({select: false})
  @UpdateDateColumn()
  updatedAt: Date

  @Exclude()
  @OneToMany(type => Game, game => game.user)
  games: Game[]

  @Exclude()
  @OneToMany(type => SocialProvider, provider => provider.user)
  providers: SocialProvider[]
}
