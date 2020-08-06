import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  // Sign In
  authSignInGoogleRequest: ['code'],
  authSignInGithubRequest: ['code'],
  authSignInSuccess: ['data'],
  authSignInFailure: ['signInError'],

  authTokenUpdate: ['token'],
  // Auth Reset
  authReset: []
})

/**
 * Data types
 */

export interface User {
  email: string
  displayName: string
}

/**
 * State type
 */
export interface AuthState {
  readonly loading: boolean
  readonly error?: String
  token?: string
  user?: User
}

export const InitialAuthState: AuthState = {
  loading: false,
  error: undefined
}
