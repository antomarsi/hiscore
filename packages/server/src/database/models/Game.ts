import {
  Table,
  Column,
  Model,
  BelongsTo,
  DataType,
  AllowNull,
  ForeignKey,
  HasMany
} from 'sequelize-typescript'

import User from './User'
import Score from './Score'

export interface GameAttributes {
  name: string
  apiKey: string
  userId: number
}

@Table({
  tableName: 'games',
  timestamps: true
})
class Game extends Model implements GameAttributes {
  @Column({
    type: DataType.STRING
  })
  @AllowNull(false)
  name: string

  @Column({
    type: DataType.UUIDV4
  })
  apiKey: string

  @ForeignKey(() => User)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User

  @HasMany(() => Score, 'gameId')
  scores: Score[]
}

export default Game
