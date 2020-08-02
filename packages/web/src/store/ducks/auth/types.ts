import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  // Sign In
  authSignInRequest: ['data'],
  authSignInSuccess: ['data'],
  authSignInFailure: ['signInError'],
  // Sign Up
  authSignUpRequest: ['data'],
  authSignUpSuccess: ['data'],
  authSignUpFailure: ['error'],
  // Auth Reset
  authReset: []
})

/**
 * Data types
 */

export interface User {
  email: string
  _id: string
}

export interface Auth {
  token: string
  user: User
}

/**
 * State type
 */
export interface AuthState {
  readonly data?: Auth
  readonly loading: boolean
  readonly error?: String
}

export const InitialAuthState: AuthState = {
  loading: false,
  error: undefined
}
