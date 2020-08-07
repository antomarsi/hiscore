import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { createServer } from 'http'

import app from './app'
import api from './config/api'
import database from './config/database'

createConnection(database)
  .then(async connection => {
    createServer(app).listen(api.port, () => {
      console.log(`Express application is up and running on port ${api.port}`)
    })
  })
  .catch(error => console.log('TypeORM connection error: ', error))
