import { call, put, takeLatest } from 'redux-saga/effects'

import api from 'src/services/api'
import { Creators, Types } from './types'
import { push } from 'connected-react-router'

export function* index() {
  try {
    const response = yield call(api.get, `/game`)
    return yield put(Creators.gameIndexSuccess(response.data))
  } catch (err) {
    yield put(Creators.gameIndexFailure(err))
  }
}

export function* show({ id }: ReturnType<typeof Creators.GAME_SHOW_REQUEST>) {
  try {
    const response = yield call(api.get, `/game/${id}`)
    yield put(Creators.gameShowSuccess(response.data))
  } catch (error) {
    yield put(Creators.gameShowFailure(error))
  }
}

export function* store({
  data
}: ReturnType<typeof Creators.GAME_STORE_REQUEST>) {
  try {
    const response = data.id
      ? yield call(api.put, `/game/${data.id}`, data)
      : yield call(api.post, `/game`, data)
    yield put(Creators.gameStoreSuccess(response.data))
    yield put(push('/games'))
  } catch (error) {
    yield put(Creators.gameStoreFailure(error))
  }
}

export function* destroy({
  id
}: ReturnType<typeof Creators.GAME_DELETE_REQUEST>) {
  try {
    yield call(api.delete, `/game/${id}`)
    yield put(Creators.gameDeleteSuccess(id))
  } catch (error) {
    yield put(Creators.gameDeleteFailure(error))
  }
}

export const saga = [
  takeLatest(Types.GAME_INDEX_REQUEST, index),
  takeLatest(Types.GAME_SHOW_REQUEST, show),
  takeLatest(Types.GAME_STORE_REQUEST, store),
  takeLatest(Types.GAME_DELETE_REQUEST, destroy)
]
