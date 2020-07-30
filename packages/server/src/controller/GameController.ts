import { checkJwt } from '../middlewares/checkJwt'
import { Request, Response } from 'express'
import User from 'database/models/User'
import Game from 'database/models/Game'

export class GameController {
  public async store(req: Request, res: Response) {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId

    //Get parameters from the body
    const { name } = req.body

    //Get user from the database
    const user = await User.findByPk(id)
    const game = Game.build({ name, user })

    game.save()

    return res.status(204).json(game)
  }
  public async update(req: Request, res: Response) {
    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId

    //Get parameters from the body
    const { name } = req.body
    const { id } = req.query

    //Get user from the database
    let game = await Game.findOne({ where: { id, userId } })
    if (!game) {
      return res.status(400).json({ error: 'Game not found' })
    }

    game.name = name
    game.save()

    res.status(200).json(game)
  }

  public async destroy(req: Request, res: Response) {
    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId

    //Get parameters from the body
    const { name } = req.body
    const { id } = req.query

    //Get user from the database
    let game = await Game.findOne({ where: { id, userId } })
    if (!game) {
      return res.status(400).json({ error: 'Game not found' })
    }
    game.destroy()
    res.status(200).json()
  }
}
