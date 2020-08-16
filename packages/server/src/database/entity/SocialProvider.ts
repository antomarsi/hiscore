import {
  Entity,
  Column,
  Unique,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity
} from 'typeorm'
import { User } from './User';
import { Allow } from 'class-validator';

export enum SOCIAL_PROVIDER_TYPE {
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB"
}

@Entity()
@Unique(['provider', 'providerId'])
export class SocialProvider extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number

  @Allow()
  @Column({nullable: false})
  providerId: string

  @Allow()
  @Column({type: "enum", enum:SOCIAL_PROVIDER_TYPE})
  provider: SOCIAL_PROVIDER_TYPE

  @ManyToOne(type => User, user => user.providers, {
    onDelete: 'CASCADE'
  })
  user: User
}
