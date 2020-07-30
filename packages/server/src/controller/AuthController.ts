import { checkJwt } from '../middlewares/checkJwt'
import { Response, Request } from 'express'
import * as jwt from 'jsonwebtoken'
import User from 'database/models/User'
import auth from '@config/auth'

class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    //Check if username and password are set
    if (!(email && password)) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    //Get user from database
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

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
    const user: User = User.build({ email, password })

    user.save()

    //If all ok, json 201 response
    res.status(201).json('User created')
  }
}
