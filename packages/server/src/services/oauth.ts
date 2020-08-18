import { AuthorizationCode } from 'simple-oauth2'

import { GOOGLE, GITHUB } from './auth'
import Axios from 'axios'
import { User } from 'src/entities/user'
import { SOCIAL_PROVIDER_TYPE } from 'src/entities/social_provider'
export interface OAuthProfile {
  id: string
  displayName: string
  email: string
}

export const clientGoogleOAuth = new AuthorizationCode({
  client: {
    id: GOOGLE.clientId,
    secret: GOOGLE.clientSecret,
  },
  auth: {
    tokenHost: 'https://oauth2.googleapis.com',
    tokenPath: '/token',
    authorizePath: '/o/oauth2/v2/auth'
  }
})

export const clientGithubOAuth = new AuthorizationCode({
  client: {
    id: GITHUB.clientId,
    secret: GITHUB.clientSecret
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize'
  },
})



export const githubAuthentication = async (code: string ) : Promise<User> => {
    const {
      token: { error, access_token }
    } = await clientGithubOAuth.getToken({
      code,
      scope: 'read:user',
      redirect_uri: GITHUB.callbackURL
    })
    if (error) {
      throw new error;
    }
    const { data } = await Axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${access_token}` }
    })
    const user = await User.upsertUser(
      {
        id: data.id,
        displayName: data.name,
        email: data.email
      },
      SOCIAL_PROVIDER_TYPE.GITHUB
    )
    return user;
}

export const googleAuthentication = async (code: string) : Promise<User> => {
    const value = await clientGoogleOAuth.getToken({
      code,
      redirect_uri: GOOGLE.callbackURL
    })
    const { data } = await Axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${value.token.access_token}` }
    })
    const user = await User.upsertUser(
      {
        id: data.id,
        displayName: data.name,
        email: data.email
      },
      SOCIAL_PROVIDER_TYPE.GOOGLE
    )
      return user
}
