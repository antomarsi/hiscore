import { Request, Response, NextFunction } from 'express'
import { getRepository, getCustomRepository } from 'typeorm'
import { classToPlain, plainToClass } from 'class-transformer'

import IControllerBase from './IController'
import { checkToken, generateToken, sendToken } from '../middlewares/jwt'
import { User, Game } from '../database/entity'
import { Leaderboard } from '../database/entity/Leaderboard'
import { GameRepository } from './../database/repository/GameRepository'
import { validate } from 'class-validator'
import { ValidationErrorException } from './../exceptions/validationError'

class GameController extends IControllerBase {
  public static path = '/game'

  public initRoutes() {
    this.router.get('/', checkToken, generateToken, sendToken, this.index)
    this.router.get('/:id', checkToken, generateToken, sendToken, this.show)
    this.router.post('/', checkToken, generateToken, sendToken, this.store)
    this.router.put(
      '/:id/favorited',
      checkToken,
      generateToken,
      sendToken,
      this.favorite
    )
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
    var games = await getCustomRepository(GameRepository).findByUser(req.user, {
      leaderboards: true
    })
    return res.status(200).json(classToPlain(games))
  }

  public async show(req: Request, res: Response) {
    var games = await getCustomRepository(GameRepository).findOne({
      relations: ['user', 'leaderboards'],
      where: { user: req.user, id: req.params.id }
    })
    return res.status(200).json(classToPlain(games))
  }

  public async favorite(req: Request, res: Response, next: NextFunction) {
    try {
      const gameRepository = getRepository(Game)
      var game = await gameRepository.findOneOrFail({
        relations: ['user'],
        where: { user: req.user, id: req.params.id }
      })
      game.favorited = req.body.favorited
      await gameRepository.save(game)
      res.status(200).json({ favorited: game.favorited })
    } catch (err) {
      next(err)
    }
  }

  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      const gameRepository = getRepository(Game)
      var game = gameRepository.create({
        ...req.body,
        user: req.user
      } as Object)
      const errors = await validate(game, { whitelist: true })
      if (errors.length) {
        throw new ValidationErrorException(errors)
      }
      const defaultLeaderboard = getRepository(Leaderboard).create({
        name: 'default'
      })
      game.leaderboards = [defaultLeaderboard]
      game = await gameRepository.save(game)
      await getRepository(Leaderboard).save(defaultLeaderboard)
      return res.status(200).json(classToPlain(game))
    } catch (err) {
      next(err)
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const gameRepository = getCustomRepository(GameRepository)
      var game = await gameRepository.findOne({
        relations: ['user'],
        where: { user: req.user, id: req.params.id }
      })

      const values = plainToClass(Game, req.body)
      const errors = await validate(values, {
        skipMissingProperties: true,
        whitelist: true
      })
      if (errors.length > 0) {
        throw new ValidationErrorException(errors)
      }
      const a = await gameRepository.update(req.params.id, values)

      res.status(200).json(a)
    } catch (err) {
      next(err)
    }
  }

  public async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const gameRepository = getRepository(Game)
      let game = await gameRepository.findOneOrFail({
        relations: ['user'],
        where: { id: req.params.id, user: req.user }
      })
      await gameRepository.delete(req.params.id)
      res.status(200).json()
    } catch (err) {
      next(err)
    }
  }
}

export default GameController
