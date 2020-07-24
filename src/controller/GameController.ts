import { Get, Put, JsonController, Post, UseBefore, Param, Req, Res } from 'routing-controllers';
import { checkJwt } from '../middlewares/checkJwt';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import { Game } from '../entity/Game';

@JsonController('game')
export class GameController {
  @Post('/')
  @UseBefore(checkJwt)
  async post(@Req() req: Request, @Res() res: Response) {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { name } = req.body;

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }
    const gameRepository = getRepository(Game);
    let game = new Game();
    game.name = name;
    const errors = await validate(game);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    game.generateKey();
    gameRepository.save(game);

    res.status(204).send(game);
  }

  @Put('/:id')
  @UseBefore(checkJwt)
  async put(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { name } = req.body;

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.find(userId);
    } catch (id) {
      res.status(401).send();
    }
    const gameRepository = getRepository(Game);
  }
}
