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
  const {
    data: { error, token, user },
    ok
  } = yield call(api.get, `/auth/${provider}`, { code })
  if (ok) {
    yield put(Creators.authSignInSuccess({ token, user }))

    history.push('/home')
    return
  }
  console.log(notificationError(error, 'Erro ao Autenticar'))
  yield put(Creators.authSignInFailure({ error }))
  yield put(
    NotificationCreators.addNotification(
      notificationError(error, 'Erro ao Autenticar')
    )
  )
  history.push('/login')
}

export const saga = [takeLatest(Types.AUTH_SIGN_IN_REQUEST, signIn)]
