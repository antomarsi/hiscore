import express from 'express'
import routes from './routes'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'
import {
  googleStrategy,
  githubStrategy,
  bearerGameStrategy,
  bearerUserStrategy
} from './config/passport'
import { User } from './database/entity/User'
import { getRepository } from 'typeorm'
import morgan from 'morgan';

const app = express()

app.use(express.json())

// CORS AND SECURITY
app.use(cors())
//app.use(helmet())
app.use(morgan("dev"))

// PASSPORT
passport.serializeUser((user: User, done) => {
  done(null, user.id)
})

passport.deserializeUser((id: number, done) => {
  getRepository(User)
    .findOneOrFail(id)
    .then(user => done(null, user))
    .catch(e => done(e, null))
})

passport.use(githubStrategy)
passport.use(googleStrategy)
passport.use('gameApiKey', bearerGameStrategy)
passport.use('user-jwt', bearerUserStrategy)

app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.use('/api', routes)

export default app
