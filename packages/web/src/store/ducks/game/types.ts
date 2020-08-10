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

  // Store / Update
  gameStoreRequest: ['data'],
  gameStoreSuccess: ['data'],
  gameStoreFailure: ['error'],

  // Store / Update
  gameFavoritedRequest: ['id', 'favorited'],
  gameFavoritedSuccess: ['id', 'favorited'],
  gameFavoritedFailure: ['id', 'error'],

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

export interface Leaderboard {
  id?: number
  name: string
  saveMethod: string
  resetMethod: string
}

export interface Game {
  id?: number
  name: string
  description: string
  apiKey?: string
  useAuthentication: boolean
  leaderboards?: Leaderboard[]
  favorited: boolean
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
  readonly favorited: {
    loading: number[]
    error?: any
  }
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
  favorited: {
    loading: [],
    error: undefined
  },
  delete: {
    loading: false,
    error: undefined
  },
  showing: {
    data: undefined,
    loading: false,
    error: false
  }
}
