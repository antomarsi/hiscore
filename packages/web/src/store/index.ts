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
import { GameState, InitialGameState } from './ducks/game/types'
import {
  InitialState as InitialNotificationState,
  NotificationState
} from './ducks/notification/types'
import { authPersistTransform } from './ducks/auth'

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

const PERSIST_WHITELIST = ['auth']
const PERSIST_BLACKLIST: string[] = []

const persistConfig: PersistConfig = {
  key: 'hiscore-app',
  storage,
  whitelist: PERSIST_WHITELIST,
  blacklist: PERSIST_BLACKLIST,
  transforms: [authPersistTransform]
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
