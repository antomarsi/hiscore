import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  // Index
  gameIndexRequest: ['data'],
  gameIndexSuccess: ['data'],
  gameIndexFailure: ['error'],

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

/**
 * Data types
 */

export interface Game {
  id: number
  name: string
  apiKey: string
  useAuthentication: boolean
}

/**
 * State type
 */
export interface GameState {
  readonly data: Game[]
  readonly loading: boolean
  readonly loadingStore: boolean
  readonly loadingDelete: boolean
  readonly error?: String
}

export const InitialGameState: GameState = {
  loading: false,
  loadingStore: false,
  loadingDelete: false,
  error: undefined,
  data: []
}
