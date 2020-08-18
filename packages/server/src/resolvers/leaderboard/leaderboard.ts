import {
  Arg,
  Field,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Ctx,
  InputType
} from 'type-graphql'

import { User } from 'src/entities/user'
import { isAuth } from 'src/middlewares/isAuth'
import { MyContext } from 'src/middlewares/MyContext'
import { Game } from 'src/entities/game'

@InputType({ description: 'New user data' })
export class AddGameInput {
  @Field()
  name!: string

  @Field()
  description!: string

  @Field()
  useAuthentication?: boolean
}

@Resolver(() => Game)
export class GameResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Game])
  async games(@Ctx() { payload }: MyContext) {
    return Game.find({ where: { user: payload?.userId } })
  }

  @UseMiddleware(isAuth)
  @Query(() => [Game])
  async game(@Ctx() { payload }: MyContext, @Arg('id') id: number) {
    return Game.findOne({ where: { id: id, user: payload?.userId } })
  }

  @Mutation(() => Game)
  insertGame(@Arg('data') data: AddGameInput) {
    const game = Game.create(data)

    return game.save()
  }

  @Mutation(() => User)
  async updateGame(
    @Ctx() { payload }: MyContext,
    @Arg('id') id: string,
    @Arg('data') data: AddGameInput
  ) {
    var game = await Game.findOne({ where: { id: id, user: payload?.userId } })

    if (game) {
      game = Game.merge(game, data)
      await game.save()

      return game
    }

    throw new Error('Game not found')
  }

  @Mutation(() => Boolean)
  async toggleFavorite(
    @Ctx() { payload }: MyContext,
    @Arg('id') id: string,
    @Arg('favorited') favorited: boolean
  ) {
    var game = await Game.findOne({ where: { id: id, user: payload?.userId } })

    if (game) {
      game.favorited = favorited
      await game.save()

      return game.favorited
    }

    throw new Error('Game not found')
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async removeGame(@Ctx() { payload }: MyContext, @Arg('id') id: string) {
    const game = await Game.findOneOrFail({
      where: { id, user: payload?.userId }
    })

    await game.remove()
    return true
  }
}
