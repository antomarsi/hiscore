import { createConnection } from 'typeorm'
import database from 'config/database'

createConnection(database)
  .then(async connection => {

  })
  .catch(error => console.log('TypeORM connection error: ', error))
