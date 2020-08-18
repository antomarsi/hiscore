import {
  Entity,
  Column,
  Unique,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity
} from 'typeorm'
import { User } from './user';
import { Field, ID } from 'type-graphql';

export enum SOCIAL_PROVIDER_TYPE {
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB"
}

@Entity()
@Unique(['provider', 'providerId'])

export class SocialProvider extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({nullable: false})
  @Field()
  providerId!: string

  @Column({type: "enum", enum:SOCIAL_PROVIDER_TYPE})
  @Field()
  provider!: SOCIAL_PROVIDER_TYPE

  @ManyToOne(() => User, user => user.providers, {
    onDelete: 'CASCADE'
  })
  user!: User
}
