import 'reflect-metadata'
import dotenv from 'dotenv'
import { createConnection } from 'typeorm'
import { createServer } from 'http'
import dotenv from 'dotenv'

dotenv.config()

dotenv.config()

import app from './app'
import database from './config/database'

const port = process.env.PORT || 3333

createConnection(database)
  .then(async connection => {
    createServer(app).listen(port, () => {
      console.log(`Express application is up and running on port ${port}`)
    })
  })
  .catch(error => console.log('TypeORM connection error: ', error))
