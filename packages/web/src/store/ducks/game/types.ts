import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  // Index
  gameIndexRequest: ['data'],
  gameIndexSuccess: ['data'],
  gameIndexFailure: ['error'],

  // Showing
  gameShowRequest: ['id'],
  gameShowSuccess: ['data'],
  gameShowFailure: ['error'],

  // Store
  gameStoreRequest: ['data'],
  gameStoreSuccess: ['data'],
  gameStoreFailure: ['error'],

  // Delete
  gameDeleteRequest: ['id'],
  gameDeleteSuccess: ['id'],
  gameDeleteFailure: ['error'],

  // Auth Reset
  gameReset: []
})

export const GameCreators = Creators

/**
 * Data types
 */

export interface Game {
  id?: number
  name: string
  description: string
  apiKey?: string
  useAuthentication: boolean
  leaderboardCounts?: number
}

/**
 * State type
 */
interface defaultLoadingError {
  loading: boolean
  error?: any
}
export interface GameState {
  readonly index: defaultLoadingError & { data: Game[] }
  readonly store: defaultLoadingError
  readonly delete: defaultLoadingError
  readonly showing: defaultLoadingError & { data?: Game }
}

export const InitialGameState: GameState = {
  index: {
    data: [],
    loading: false,
    error: undefined
  },
  store: {
    loading: false,
    error: undefined
  },
  delete: {
    loading: false,
    error: undefined
  },
  showing: {
    loading: false,
    error: false
  }
}
