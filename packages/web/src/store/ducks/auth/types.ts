import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  // Sign In
  authSignInRequest: ['code', 'provider'],
  authSignInSuccess: ['token', 'user'],
  authSignInFailure: [],

  authTokenUpdate: ['token'],
  // Auth Reset
  authReset: []
})

export const AuthCreators = Creators

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
  readonly error: boolean
  token?: string
  user?: User
}

export const InitialAuthState: AuthState = {
  loading: false,
  error: false
}
