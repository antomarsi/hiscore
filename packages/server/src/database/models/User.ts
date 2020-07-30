import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  AllowNull,
  Unique
} from 'sequelize-typescript'
import bcrypt from 'bcrypt'

import Game from './Game'

export interface UserAttributes {
  id?: number
  email: string
  password: string
}

@Table({
  tableName: 'users',
  timestamps: true
})
class User extends Model implements UserAttributes {
  @Column({
    type: DataType.STRING
  })
  @AllowNull(false)
  @Unique
  email: string

  @Column
  get password(): string {
    return this.getDataValue('password')
  }
  set password(value: string) {
    this.setDataValue('password', bcrypt.hashSync(value, 8))
  }

  @HasMany(() => Game)
  games: Game[]

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }
}

export default User
