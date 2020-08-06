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
  [Types.AUTH_SIGN_IN_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true
  }),
  [Types.AUTH_SIGN_IN_SUCCESS]: (
    state = INITIAL_STATE,
    { data: { token, user } }
  ) => ({
    ...state,
    loading: false,
    error: undefined,
    token,
    user
  }),
  [Types.AUTH_SIGN_IN_FAILURE]: (state = INITIAL_STATE, { error }) => ({
    ...state,
    loading: false,
    error,
    token: undefined,
    user: undefined
  }),

  [Types.AUTH_TOKEN_UPDATE]: (state = INITIAL_STATE, { token }) => ({
    ...state,
    token
  }),

  [Types.AUTH_RESET]: (state = INITIAL_STATE) => ({
    ...INITIAL_STATE
  })
})
