import { call, put, takeLatest } from 'redux-saga/effects'

import api from '../../../services/api'
import history from '../../../routes/history'

import { Creators, Types } from './types'

export function* fetch({
  code
}: ReturnType<typeof Creators.AUTH_SIGN_IN_REQUEST>) {
  const {
    data: { error, token, user },
    ok
  } = yield call(api.get, '/auth/google', { code })
  console.log(token, user)
  if (ok) {
    yield put(Creators.authSignInSuccess({ token, user }))

    history.push('/home')
    return
  }

  yield put(Creators.authSignInFailure({ error }))
}

export function* store({
  data
}: ReturnType<typeof Creators.GAME_STORE_REQUEST>) {
  if (data.id) {
  }
  const {
    data: { error },
    ok
  } = data.id
    ? yield call(api.put, `/game/${data.id}`, data)
    : yield call(api.post, `/game`, data)

  if (ok) {
    yield put(Creators.gameStoreSuccess(data))
    return
  }

  yield put(Creators.gameStoreFailure(error))
}

export function* destroy({
  id
}: ReturnType<typeof Creators.GAME_DELETE_REQUEST>) {
  const {
    data: { error },
    ok
  } = yield call(api.delete, `/game/${id}`)
  if (ok) {
    yield put(Creators.gameDeleteSuccess(id))
    return
  }

  yield put(Creators.authSignInFailure(error))
}

export const saga = [
  takeLatest(Types.GAME_INDEX_REQUEST, fetch),
  takeLatest(Types.GAME_STORE_REQUEST, store),
  takeLatest(Types.GAME_DELETE_REQUEST, destroy)
]
