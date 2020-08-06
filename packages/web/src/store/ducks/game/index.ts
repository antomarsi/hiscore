import { createReducer } from 'reduxsauce'
import { InitialGameState as INITIAL_STATE, Types } from './types'

export default createReducer(INITIAL_STATE, {
  [Types.GAME_INDEX_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true
  }),
  [Types.GAME_INDEX_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    error: undefined,
    data
  }),
  [Types.GAME_INDEX_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    loading: false,
    error
  }),

  [Types.GAME_STORE_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loadingStore: true
  }),
  [Types.GAME_STORE_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loadingStore: false,
    error: undefined,
    data: state.data.map(game => (game.id === data.id ? data : game))
  }),
  [Types.GAME_STORE_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    loadingStore: false,
    error
  }),

  [Types.GAME_DELETE_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loadingDelete: true
  }),
  [Types.GAME_DELETE_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loadingDelete: false,
    error: undefined,
    data: state.data.filter(game => game.id !== data.id)
  }),
  [Types.GAME_DELETE_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    loadingDelete: false,
    error
  }),

  [Types.GAME_RESET]: (state = INITIAL_STATE) => ({
    ...INITIAL_STATE
  })
})
