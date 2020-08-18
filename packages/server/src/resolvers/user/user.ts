import {
  Arg,
  Field,
  Mutation,
  Query,
  Resolver,
  ObjectType,
  UseMiddleware,
  Ctx
} from 'type-graphql'

import { User } from 'src/entities/user'
import { githubAuthentication, googleAuthentication } from 'src/services/oauth'
import auth from 'src/services/auth'
import { sign } from 'jsonwebtoken'
import { isAuth } from 'src/middlewares/isAuth'
import { MyContext } from 'src/middlewares/MyContext'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string
}

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('code') code: string,
    @Arg('provider') provider: 'google' | 'github'
  ) {
    var user: User
    if (provider === 'github') {
      user = await githubAuthentication(code)
    } else {
      user = await googleAuthentication(code)
    }
    const accessToken = sign(
      {
        userId: user.id
      },
      auth.secret,
      {
        expiresIn: auth.expiresIn
      }
    )

    return { accessToken }
  }

  @Query(() => User)
  async user(@Arg('id') id: string) {
    const user = await User.findOne(id)

    if (user) {
      return user
    }

    throw new Error('User not found')
  }
  @Query(() => String)
  @UseMiddleware(isAuth)
  async Me(@Ctx() { payload }: MyContext) {
    return User.findOne(payload!.userId)
  }
}
