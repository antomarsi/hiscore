import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'

import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator'
import { Score } from './Score'

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20 })
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

  @Column({ type: 'simple-json', nullable: true, length: 255 })
  data: any

  @OneToMany(type => Score, score => score.player)
  scores: Score[]
}
