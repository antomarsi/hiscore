import { EntityRepository, Repository, getRepository } from 'typeorm'

import { Game, User, Leaderboard } from './../entity'

interface findByUserOptions {
  countLeaderboard: boolean
}

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  findByUser(user: User, options?: findByUserOptions): Promise<Game[]> {
    let query = this.createQueryBuilder('game')
      .select('game.*')
      .where('game.user_id = :userId', { userId: user.id })

    if (options?.countLeaderboard) {
      query
        .innerJoin(Leaderboard, 'leaderboard', 'leaderboard.game_id = game.id')
        .addSelect('count(leaderboard.*)', 'leaderboardCounts')
        .groupBy('game.id')
    }

    return query.getMany()
  }
}
