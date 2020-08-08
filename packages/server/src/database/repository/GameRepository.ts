import { EntityRepository, Repository, getRepository } from 'typeorm'

import { Game, User, Leaderboard } from './../entity'
import { Allow } from 'class-validator'

interface findByUserOptions {
  countLeaderboard: boolean
}

class FindByUser extends Game {
  @Allow()
  leaderboardCounts: number
}

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  findByUser(user: User, options?: findByUserOptions): Promise<FindByUser[]> {
    let query = this.createQueryBuilder('game')
      .select('game.*')
      .innerJoin('game.user', 'user')
      .where('game.user.id = :user', { user: user.id })

    if (options?.countLeaderboard) {
      query
        .leftJoin('game.leaderboards', 'leaderboard')
        .addSelect('count(leaderboard.*)', 'leaderboardCounts')
        .groupBy('game.id')
    }

    return query.getRawMany()
  }
}
