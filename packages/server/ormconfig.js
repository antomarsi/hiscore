const path = require('path')

module.exports = {
  type: 'postgres',
  post: process.env.PG_PORT || 5432,
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  synchronize: true,
  entities: ['src/database/entity/*.js'],
  subscribers: ['src/database/subscriber/*.js'],
  migrations: ['src/database/migration/*.js'],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber'
  }
}
