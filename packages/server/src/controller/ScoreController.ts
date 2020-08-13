import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import IControllerBase from './IController'
import { Score, Game, Leaderboard } from '../database/entity'

class ScoreController extends IControllerBase {
  public static path = '/score'

  public initRoutes() {
    this.router.post('/', this.index)
    this.router.put('/', this.store)
  }

  public async index(req: Request, res: Response) {
    const gameId = res.locals.jwtPayload.gameId

    const scores = await getRepository(Score).find({
      where: {
        gameId
      },
      order: {
        score: 'DESC'
      }
    })

    return res.status(200).send(scores)
  }

  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { player, score: scoreValue } = req.body
      /*

      var score = new Score()
      score.leaderboard = leaderboard
      score.player = player
      score.score = scoreValue
      getRepository(Score).save(score)

      res.status(200).send()*/
    } catch (err) {
      next(err)
    }
  }
}

export default ScoreController
