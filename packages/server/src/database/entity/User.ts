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
import { SocialProvider } from './SocialProvider'

@Entity()
@Unique(['email'])
export class User{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  displayName: string

  @Column()
  email: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(type => Game, game => game.user)
  games: Game[]

  @OneToMany(type => SocialProvider, provider => provider.user)
  providers: SocialProvider[]
}
