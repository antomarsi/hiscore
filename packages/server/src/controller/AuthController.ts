import { Response, Request, Router } from 'express'
import * as jwt from 'jsonwebtoken'
import auth from '../config/auth'
import IControllerBase from './IController'
import { getRepository } from 'typeorm'
import { User } from 'database/entity/User'

class AuthController implements IControllerBase {
  public path = '/'
  public router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/login', this.login)
    this.router.post('/signup', this.store)
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    //Check if username and password are set
    if (!(email && password)) {
      return res.status(400).json({ error: 'Invalid request' })
    }
    const userRepository = getRepository(User)
    const user = await userRepository.findOneOrFail({ where: { email } })

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.email },
      auth.secret,
      {
        expiresIn: auth.expiresIn
      }
    )

    //json the jwt in the response
    return res.status(200).json(token)
  }

  async store(req: Request, res: Response) {
    const { email, password } = req.body
    //Get parameters from the body
    const userRepository = getRepository(User)
    const user: User = new User()
    user.email = email
    user.password = password
    user.hashPassword()
    userRepository.save(user)

    //If all ok, json 201 response
    res.status(201).json('User created')
  }
}

export default AuthController
