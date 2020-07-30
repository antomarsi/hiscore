import {
  Table,
  Column,
  Model,
  BelongsTo,
  DataType,
  AllowNull,
  ForeignKey
} from 'sequelize-typescript'

import Game from './Game'

export interface ScoreAttributes {
  player: string
  score: number
  gameId: number
}

@Table({
  tableName: 'scores',
  timestamps: true
})
class Score extends Model implements ScoreAttributes {
  @Column({
    type: DataType.STRING
  })
  @AllowNull(false)
  player: string

  @Column
  score: number

  @ForeignKey(() => Game)
  @Column(DataType.INTEGER)
  gameId: number

  @BelongsTo(() => Game)
  game: Game
}

export default Score
