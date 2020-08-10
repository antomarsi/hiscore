import { call, put, takeLatest } from 'redux-saga/effects'

import api from 'src/services/api'
import { Creators, Types } from './types'
import { push } from 'connected-react-router'

export function* signIn({
  code,
  provider
}: ReturnType<typeof Creators.AUTH_SIGN_IN_REQUEST>) {
  try {
    const response = yield call(api.get, `/auth/${provider}`, {
      params: { code }
    })
    yield put(
      Creators.authSignInSuccess(response.data.token, response.data.user)
    )
    yield put(push('/dashboard'))
    return
  } catch (err) {
    yield put(Creators.authSignInFailure(err))
    yield put(push('/login'))
  }
}

export const saga = [takeLatest(Types.AUTH_SIGN_IN_REQUEST, signIn)]
