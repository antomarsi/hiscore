import { Options } from 'sequelize'

const database: Options = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  database: 'sqlnode',
  define: {
    timestamps: true,
    underscored: true
  }
}

export default database
