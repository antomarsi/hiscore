import { Request, Response, Router } from 'express'
import IControllerBase from './IController'
import { checkApiKey } from 'middlewares/checkApiKey'
import { getRepository } from 'typeorm'
import { Score } from 'database/entity/Score'
import { Game } from 'database/entity/Game'

class ScoreController implements IControllerBase {
  public path = '/score'
  public router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post('/', checkApiKey, this.index)
    this.router.put('/', checkApiKey, this.store)
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
    score.game = game
    score.player = player
    score.score = scoreValue
    getRepository(Score).save(score)

    res.status(200).send()
  }
}

export default ScoreController
