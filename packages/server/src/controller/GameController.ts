import { Request, Response } from 'express'
import { getRepository, getCustomRepository } from 'typeorm'
import { classToPlain } from 'class-transformer'

import IControllerBase from './IController'
import { checkToken, generateToken, sendToken } from '../middlewares/jwt'
import { User, Game } from '../database/entity'
import { Leaderboard } from '../database/entity/Leaderboard'
import { GameRepository } from './../database/repository/GameRepository'

class GameController extends IControllerBase {
  public static path = '/game'

  public initRoutes() {
    this.router.get('/', checkToken, generateToken, sendToken, this.index)
    this.router.post('/', checkToken, generateToken, sendToken, this.store)
    this.router.put('/:id', checkToken, generateToken, sendToken, this.update)
    this.router.delete(
      '/:id',
      checkToken,
      generateToken,
      sendToken,
      this.destroy
    )
  }

  public async index(req: Request, res: Response) {
    var games = await getCustomRepository(GameRepository).findByUser(
      req.user!,
      { countLeaderboard: true }
    )
    return res.status(200).json(classToPlain(games))
  }

  public async store(req: Request, res: Response) {
    //Get parameters from the body
    const { name } = req.body
    const gameRepository = getRepository(Game)
    //Get user from the database
    const game = new Game()
    game.name = name
    game.user = req.user as User
    const defaultLeaderboard = new Leaderboard()
    defaultLeaderboard.name = 'Default'
    game.leaderboards = [defaultLeaderboard]

    gameRepository.save(game)

    return res.status(204).json(game)
  }
  public async update(req: Request, res: Response) {
    //Get ID from JWT

    //Get parameters from the body
    const { name } = req.body
    const { id } = req.query

    const gameRepository = getRepository(Game)

    //Get user from the database
    let game = await gameRepository.findOneOrFail({
      where: { id, userId: (req.user as User).id }
    })
    game.name = name
    gameRepository.save(game)

    res.status(200).json(game)
  }

  public async destroy(req: Request, res: Response) {
    //Get parameters from the body
    const { id } = req.query
    const gameRepository = getRepository(Game)

    //Get user from the database
    let game = await gameRepository.findOneOrFail({
      where: { id, userId: (req.user as User).id }
    })
    gameRepository.delete(game)
    res.status(200).json()
  }
}

export default GameController
