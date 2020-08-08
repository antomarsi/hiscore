import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import routes from './routes'
import errorMiddleware from './middlewares/errorMiddleware'

const app = express()

// Middlewares

app.use(express.json())

// CORS AND SECURITY
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

// ROUTES
app.use('/api', routes)
app.use(errorMiddleware)

export default app
