import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Length, IsNotEmpty, IsEmail } from 'class-validator'
import * as bcrypt from 'bcryptjs'
import { Game } from './Game'

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  @Length(4, 100)
  password: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(type => Game, game => game.user)
  games: Game[]

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }
}