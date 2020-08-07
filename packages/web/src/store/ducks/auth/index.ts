import { createReducer } from 'reduxsauce'
import { InitialAuthState as INITIAL_STATE, Types } from './types'
import { createFilter } from 'redux-persist-transform-filter'

export const authPersistTransform = createFilter('auth', ['token', 'user'])

export default createReducer(INITIAL_STATE, {
  [Types.AUTH_SIGN_IN_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true
  }),
  [Types.AUTH_SIGN_IN_SUCCESS]: (state = INITIAL_STATE, { token, user }) => ({
    ...state,
    loading: false,
    error: false,
    token,
    user
  }),
  [Types.AUTH_SIGN_IN_FAILURE]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
    error: true,
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
