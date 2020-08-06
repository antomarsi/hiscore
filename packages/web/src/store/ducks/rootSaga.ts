import { saga as AuthSagas } from './auth/saga'
import { saga as GameSagas } from './game/saga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  return yield all([...AuthSagas, ...GameSagas])
}
