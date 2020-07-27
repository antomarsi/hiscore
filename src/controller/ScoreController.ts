import { Get, Put, JsonController, UseBefore, Res, Req } from 'routing-controllers';
import { checkApiKey } from '../middlewares/checkApiKey';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Game } from '../entity/Game';
import { Score } from '../entity/Score';
import { validate } from 'class-validator';

@JsonController('/api/score')
export class ScoreController {
  @Get('')
  @UseBefore(checkApiKey)
  async get(@Req() req: Request, @Res() res: Response) {
    const gameId = res.locals.jwtPayload.gameId;

    //Get parameters from the body
    const { player, score } = req.body;

    //Get user from the database
    const gameRepository = getRepository(Game);
    var game: Game;
    try {
      game = await gameRepository
        .createQueryBuilder('game')
        .leftJoinAndSelect('game.scores', 'score')
        .orderBy({ 'score.score': 'DESC' })
        .getOne();
    } catch (id) {
      return res.status(401).send();
    }
    return res.status(200).send(game.scores);
  }

  @Put('')
  async put(@Req() req: Request, @Res() res: Response) {
    const gameId = res.locals.jwtPayload.gameId;

    //Get parameters from the body
    const { player, score } = req.body;

    //Get user from the database
    const gameRepository = getRepository(Game);
    var game: Game;
    try {
      game = await gameRepository.findOne(gameId);
    } catch (id) {
      res.status(401).send();
    }
    var newScore: Score;
    const scoreRepository = getRepository(Score);
    newScore.player = player;
    newScore.score = score;
    newScore.game = game;
    const errors = await validate(game);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    scoreRepository.save(newScore);
    res.status(200).send();
  }
}
