import { createReducer } from 'reduxsauce'
import { InitialGameState as INITIAL_STATE, Types, Game } from './types'

export default createReducer(INITIAL_STATE, {
  [Types.GAME_INDEX_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    index: {
      ...state.index,
      loading: true
    }
  }),
  [Types.GAME_INDEX_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    index: { loading: false, error: undefined, data }
  }),
  [Types.GAME_INDEX_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    index: { ...state.index, loading: false, error }
  }),

  [Types.GAME_SHOW_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    showing: { loading: true }
  }),
  [Types.GAME_SHOW_SUCCESS]: (
    state = INITIAL_STATE,
    { data }: { data: Game }
  ) => ({
    ...state,
    showing: { loading: false, data }
  }),
  [Types.GAME_SHOW_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    showing: { loading: false, error }
  }),

  [Types.GAME_STORE_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    store: { ...state.store, loading: true }
  }),
  [Types.GAME_STORE_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    store: { loading: false }
  }),
  [Types.GAME_STORE_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    store: { loading: false, error }
  }),

  [Types.GAME_FAVORITED_REQUEST]: (state = INITIAL_STATE, { id }) => ({
    ...state,
    favorited: { ...state.favorited, loading: [...state.favorited.loading, id] }
  }),
  [Types.GAME_FAVORITED_SUCCESS]: (
    state = INITIAL_STATE,
    { id, favorited }
  ) => ({
    ...state,
    favorited: {
      ...state.favorited,
      loading: state.favorited.loading.filter(v => v !== id)
    },
    index: {
      ...state.index,
      data: state.index.data.map(game =>
        game.id === id ? { ...game, favorited } : game
      )
    }
  }),
  [Types.GAME_FAVORITED_FAILURE]: (state = INITIAL_STATE, { id, error }) => ({
    ...state,
    favorited: { loading: state.favorited.loading.filter(v => v !== id), error }
  }),

  [Types.GAME_DELETE_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    delete: { loading: true }
  }),
  [Types.GAME_DELETE_SUCCESS]: (state = INITIAL_STATE, { id }) => ({
    ...state,
    delete: { loading: false },
    index: {
      ...state.index,
      data: state.index.data.filter(game => game.id !== id)
    }
  }),
  [Types.GAME_DELETE_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    delete: { loading: false, error }
  }),

  [Types.GAME_RESET]: (state = INITIAL_STATE) => ({
    ...INITIAL_STATE
  })
})
