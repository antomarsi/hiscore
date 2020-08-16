import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity
} from 'typeorm'

import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator'
import { Score } from './Score'

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @MaxLength(20)
  @IsNotEmpty()
  displayName: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  @IsNotEmpty()
  password: string

  @Column({ type: 'simple-json', nullable: true })
  data: any

  @OneToMany(type => Score, score => score.player)
  scores: Score[]
}
