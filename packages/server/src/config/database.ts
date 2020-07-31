import { resolve } from 'path'
import { ConnectionOptions } from 'typeorm'

const database: ConnectionOptions = {
  type: 'postgres',
  port: Number(process.env.PG_PORT) || 5432,
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  synchronize: true,
  entities: [resolve(__dirname, '..', 'database', 'entity', '*.ts')],
  subscribers: [resolve(__dirname, '..', 'database', 'subscriber', '*.ts')],
  migrations: [resolve(__dirname, '..', 'database', 'migration', '*.ts')]
}

export default database
