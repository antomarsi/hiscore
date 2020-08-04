import { Request, Response, Router } from 'express'
import IControllerBase from './IController'
import { getRepository } from 'typeorm'
import { Score } from '../database/entity/Score'
import { Game } from '../database/entity/Game'
import passport from 'passport'

class ScoreController extends IControllerBase {
  public static path = '/score'

  public initRoutes() {
    this.router.post(
      '/',
      passport.authenticate('gameApiKey', { session: false }),
      this.index
    )
    this.router.put(
      '/',
      passport.authenticate('gameApiKey', { session: false }),
      this.store
    )
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

  public async store(req: Request, res: Response) {
    const gameId = res.locals.jwtPayload.gameId

    //Get parameters from the body
    const { player, score: scoreValue } = req.body

    //Get user from the database
    const game = await getRepository(Game).findOneOrFail(gameId)

    var score = new Score()
    score.leaderboard = leaderboard
    score.player = player
    score.score = scoreValue
    getRepository(Score).save(score)

    res.status(200).send()
  }
}

export default ScoreController
