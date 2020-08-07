import { call, put, takeLatest } from 'redux-saga/effects'

import api from './../../../services/api'
import history from './../../../routes/history'

import { Creators, Types } from './types'
import { Creators as NotificationCreators } from '../notification/types'
import { notificationError } from 'src/utils/handleMessages'

export function* signIn({
  code,
  provider
}: ReturnType<typeof Creators.AUTH_SIGN_IN_REQUEST>) {
  const response = yield call(api.get, `/auth/${provider}`, {
    code
  })
  if (response.ok) {
    yield put(
      Creators.authSignInSuccess(response.data.token, response.data.user)
    )

    history.push('/dashboard')
    return
  }
  yield put(Creators.authSignInFailure())
  yield put(
    NotificationCreators.addNotification(
      notificationError(response, 'Falha ao buscar')
    )
  )
  history.push('/login')
}

export const saga = [takeLatest(Types.AUTH_SIGN_IN_REQUEST, signIn)]
