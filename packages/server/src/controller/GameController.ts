import { checkJwt } from '../middlewares/checkJwt'
import { Request, Response, Router } from 'express'
import IControllerBase from './IController'
import { getRepository } from 'typeorm'
import { User } from '../database/entity/User'
import { Game } from '../database/entity/Game'

class GameController implements IControllerBase {
  public path = '/game'
  public router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post('/', checkJwt, this.store)
    this.router.put('/:id', checkJwt, this.update)
    this.router.delete('/:id', checkJwt, this.destroy)
  }

  public async store(req: Request, res: Response) {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId

    //Get parameters from the body
    const { name } = req.body
    const userRepository = getRepository(User)
    const gameRepository = getRepository(Game)
    const user = await userRepository.findOneOrFail(id)
    //Get user from the database
    const game = new Game()
    game.name = name
    game.user = user

    gameRepository.save(game)

    return res.status(204).json(game)
  }
  public async update(req: Request, res: Response) {
    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId

    //Get parameters from the body
    const { name } = req.body
    const { id } = req.query

    const gameRepository = getRepository(Game)

    //Get user from the database
    let game = await gameRepository.findOneOrFail({ where: { id, userId } })
    game.name = name
    gameRepository.save(game)

    res.status(200).json(game)
  }

  public async destroy(req: Request, res: Response) {
    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId

    //Get parameters from the body
    const { id } = req.query
    const gameRepository = getRepository(Game)

    //Get user from the database
    let game = await gameRepository.findOneOrFail({ where: { id, userId } })
    gameRepository.delete(game)
    res.status(200).json()
  }
}

export default GameController
