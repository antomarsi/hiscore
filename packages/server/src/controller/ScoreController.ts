import { Request, Response } from 'express'
import IControllerBase from './IController'
import { getRepository } from 'typeorm'
import { Score } from '../database/entity/Score'
import { Game } from '../database/entity/Game'
import passport from 'passport'
import { Leaderboard } from '../database/entity/Leaderboard'

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
    //Get parameters from the body
    const { player, score: scoreValue } = req.body

    //Get user from the database
    const game = await getRepository(Game).findOneOrFail({
      relations: ['leaderboards'],
      where: { id: (req.user as Game).id }
    })
    var leaderboard: Leaderboard
    if (game.leaderboards.length > 1 && !req.body.leaderboard) {
      return res.status(400).json('especify a leaderboard')
    } else if (game.leaderboards.length == 1) {
      leaderboard = game.leaderboards[0]
    } else {
      leaderboard = await getRepository(Leaderboard).findOneOrFail({
        where: { sku: req.body.leaderboard, gameId: game.id }
      })
    }

    var score = new Score()
    score.leaderboard = leaderboard
    score.player = player
    score.score = scoreValue
    getRepository(Score).save(score)

    res.status(200).send()
  }
}

export default ScoreController
