import { checkLogin } from '../middlewares/checkLogin'
import { Request, Response, Router } from 'express'
import IControllerBase from './IController'
import { getRepository } from 'typeorm'
import { User } from '../database/entity/User'
import { Game } from '../database/entity/Game'
import { Leaderboard } from 'database/entity/Leaderboard'

class GameController extends IControllerBase {
  public static path = '/game'

  public initRoutes() {
    this.router.post('/', checkLogin, this.store)
    this.router.put('/:id', checkLogin, this.update)
    this.router.delete('/:id', checkLogin, this.destroy)
    this.router.put('/:id/leaderboard/:leaderboardId', checkLogin, this.update)
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

  public async updateLeaderboard(req: Request, res: Response) {
    const { id, leaderboardId } = req.query
    const leaderboardRepository = getRepository(Leaderboard)
    let leaderboard = await leaderboardRepository.findOneOrFail({
      join: {
        alias: 'leaderboard',
        innerJoin: {
          game: 'leaderboard.game',
          user: 'game.user'
        }
      },
      where: { game: { id }, id: leaderboardId }
    })
    const { name, saveMethod, resetMethod } = req.body
    leaderboard.name = name
    leaderboard.saveMethod = saveMethod
    leaderboard.resetMethod = resetMethod
    leaderboardRepository.save(leaderboard)
    return res.status(200).json(leaderboard)
  }

  public async deleteLeaderboard(req: Request, res: Response) {
    const { id, leaderboardId } = req.query
    const leaderboardRepository = getRepository(Leaderboard)
    let leaderboard = await leaderboardRepository.findOneOrFail({
      join: {
        alias: 'leaderboard',
        innerJoin: {
          game: 'leaderboard.game',
          user: 'game.user'
        }
      },
      where: { game: { id }, id: leaderboardId }
    })
    leaderboardRepository.delete(leaderboard)
    return res.status(200)
  }
}

export default GameController
