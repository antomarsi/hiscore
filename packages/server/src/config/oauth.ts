import { GOOGLE, GITHUB } from './auth'
import { AuthorizationCode } from 'simple-oauth2'

export interface OAuthProfile {
  id: string
  displayName: string
  email: string
}

export const clientGoogleOAuth = new AuthorizationCode({
  client: {
    id: GOOGLE.clientId,
    secret: GOOGLE.clientSecret
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
