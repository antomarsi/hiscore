import { Request, Response } from 'express'
import Game from 'database/models/Game'
import Score from 'database/models/Score'

export class ScoreController {
  public async index(req: Request, res: Response) {
    const gameId = res.locals.jwtPayload.gameId

    //Get user from the database
    const game = await Game.findByPk(gameId, {
      include: [Score],
    })
    if (!game) {
      return res.status(400).json({ error: 'Game not found' })
    }
    return res.status(200).send(game.scores)
  }

  public async store(req: Request, res: Response) {
    const gameId = res.locals.jwtPayload.gameId

    //Get parameters from the body
    const { player, score: scoreValue } = req.body

    //Get user from the database
    const game = await Game.findByPk(gameId)

    if (!game) {
      return res.status(400).json({ error: 'Game not found' })
    }

    var score = Score.build({ player, score: scoreValue, game })

    score.save()
    res.status(200).send()
  }
}
