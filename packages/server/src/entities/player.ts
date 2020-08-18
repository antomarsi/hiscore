import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator'
import { Score } from './score'

@Entity()
@ObjectType()
export class Player {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number

  @Column()
  @MaxLength(20)
  @IsNotEmpty()
  @Field()
  displayName!: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email!: string

  @Column()
  @IsNotEmpty()
  password!: string

  @OneToMany(() => Score, score => score.player)
  @Field()
  scores!: Score[]
}
