import { call, put, takeLatest } from 'redux-saga/effects'

import api from '../../../services/api'

import { Creators, Types } from './types'
import { NotificationCreators } from '../notification/types'
import { notificationError } from 'src/utils/handleMessages'

export function* fetch({
  code,
  provider
}: ReturnType<typeof Creators.GAME_INDEX_REQUEST>) {
  const response = yield call(api.get, `/game`)
  if (response.ok) {
    yield put(Creators.gameIndexSuccess(response.data))
    return
  }
  yield put(Creators.gameIndexFailure())
  yield put(
    NotificationCreators.addNotification(
      notificationError(response, 'Erro ao Autenticar')
    )
  )
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
