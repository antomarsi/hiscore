import { call, put, takeLatest } from 'redux-saga/effects'

import api from './../../../services/api'
import history from './../../../routes/history'

import { Creators, Types } from './types'

export function* signInWithGoogle({
  code
}: ReturnType<typeof Creators.AUTH_SIGN_IN_REQUEST>) {
  const {
    data: { error, token, user },
    ok
  } = yield call(api.get, '/auth/google', { code })
  console.log(token, user);
  if (ok) {
    yield put(Creators.authSignInSuccess({ token, user }))

    history.push('/home')
    return
  }

  yield put(Creators.authSignInFailure({ error }))
}

export function* signInWithGithub({
  code
}: ReturnType<typeof Creators.AUTH_SIGN_IN_REQUEST>) {
  const {
    data: { error, token, user },
    ok
  } = yield call(api.get, '/auth/github', { code })
  console.log(token, user);
  if (ok) {
    yield put(Creators.authSignInSuccess({ token, user }))

    history.push('/home')
    return
  }

  yield put(Creators.authSignInFailure({ error }))
}

export const saga = [
  takeLatest(Types.AUTH_SIGN_IN_GOOGLE_REQUEST, signInWithGoogle),
  takeLatest(Types.AUTH_SIGN_IN_GITHUB_REQUEST, signInWithGithub)
]
