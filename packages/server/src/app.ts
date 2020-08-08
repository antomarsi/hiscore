import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

import routes from './routes'
import errorMiddleware from './middlewares/errorMiddleware'

const app = express()

// Middlewares
app.use(
  cors({
    exposedHeaders: 'x-auth-token'
  })
)
app.options('*', cors())
app.use(express.json())
app.use(compression())

app.use(helmet())
app.use(morgan('combined'))

// ROUTES
app.use('/api', routes)
app.use(errorMiddleware)

export default app
