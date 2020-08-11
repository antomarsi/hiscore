import { EntityRepository, Repository, getRepository } from 'typeorm'

import { Game, User, Leaderboard } from './../entity'
import { Allow } from 'class-validator'

interface findByUserOptions {
  leaderboards: boolean
}

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  findByUser(user: User, options?: findByUserOptions): Promise<Game[]> {
    let query = this.createQueryBuilder('game')
      .innerJoin('game.user', 'user')
      .where('game.user.id = :user', { user: user.id })

    if (options?.leaderboards) {
      query.leftJoinAndSelect(
        'game.leaderboards',
        'leaderboard',
        'leaderboard.game.id = game.id'
      )
    }

    return query.getMany()
  }
}
