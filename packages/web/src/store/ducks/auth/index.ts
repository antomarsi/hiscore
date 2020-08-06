import { createReducer } from 'reduxsauce'
import { createFilter } from 'redux-persist-transform-filter'
import { InitialAuthState as INITIAL_STATE, Types } from './types'

export const FILTER_PERSISTOR = createFilter(
  'auth',
  undefined,
  ['token', 'user'],
  'whitelist'
)

export default createReducer(INITIAL_STATE, {
  [Types.AUTH_SIGN_IN_GOOGLE_REQUEST]: () => ({
    ...INITIAL_STATE,
    loading: true
  }),
  [Types.AUTH_SIGN_IN_GITHUB_REQUEST]: () => ({
    ...INITIAL_STATE,
    loading: true
  }),

  [Types.AUTH_SIGN_IN_SUCCESS]: (
    state = INITIAL_STATE,
    { data: { token, user } }
  ) => ({
    ...state,
    loading: false,
    error: undefined,
    data: {
      token,
      user
    }
  }),
  [Types.AUTH_SIGN_IN_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    loading: false,
    error,
    data: undefined
  }),

  [Types.AUTH_SIGN_UP_REQUEST]: () => ({
    ...INITIAL_STATE,
    loading: true,
    error: undefined
  }),
  [Types.AUTH_SIGN_UP_SUCCESS]: (
    state = INITIAL_STATE,
    { data: { token, user } }
  ) => ({
    ...state,
    loading: true
  }),
  [Types.AUTH_SIGN_UP_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    loading: true,
    error
  }),

  [Types.AUTH_RESET]: (state = INITIAL_STATE) => ({
    ...INITIAL_STATE
  })
})
