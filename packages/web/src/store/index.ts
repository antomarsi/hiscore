import { createStore, compose, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { History } from 'history'
import { routerMiddleware, RouterState } from 'connected-react-router'
import { InitialAuthState, AuthState } from './ducks/auth/types'
import createRootReducer from './ducks/rootReducer'
import rootSaga from './ducks/rootSaga'
import reactotron from './../config/ReactotronConfig'
import history from './../routes/history'
import { FILTER_PERSISTOR as AUTH_FILTER } from './ducks/auth'
import { GameState, InitialGameState } from './ducks/game/types'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import {
  InitialState as InitialNotificationState,
  NotificationState
} from './ducks/notification/types'

export type ApplicationState = {
  auth: AuthState
  game: GameState
  notification: NotificationState
  router?: RouterState
}

const initialState: ApplicationState = {
  auth: InitialAuthState,
  game: InitialGameState,
  notification: InitialNotificationState
}

export const WHITE_LIST = ['auth']

export const BLACK_LIST = []

export const FILTERS_PERSISTOR = [AUTH_FILTER]

const persistConfig: PersistConfig = {
  key: 'hiscore-app',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: BLACK_LIST,
  whitelist: WHITE_LIST,
  transforms: FILTERS_PERSISTOR
}

const configureStore = (
  history: History,
  preloadedState: ApplicationState = initialState
) => {
  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history)
  )
  var sagaMonitor =
    process.env.NODE_ENV === 'development'
      ? reactotron.createSagaMonitor!()
      : undefined

  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  var middlewares = [sagaMiddleware, routerMiddleware(history)]

  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(reactotron.createEnhancer!(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares)

  const store: Store<ApplicationState> = createStore(
    persistedReducer,
    preloadedState,
    enhancer
  )
  let persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}

export default configureStore(history)
