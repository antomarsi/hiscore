import { createStore, compose, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { History } from 'history'
import { routerMiddleware, RouterState } from 'connected-react-router'
import { InitialAuthState, AuthState } from './ducks/auth/types'
import createRootReducer from './ducks/rootReducer'
import rootSaga from './ducks/rootSaga'
import createFilter from 'redux-persist-transform-filter'
import reactotron from './../config/ReactotronConfig';
import history from './../routes/history';

export type ApplicationState = {
  auth: AuthState
  router?: RouterState
}

const initialState: ApplicationState = {
  auth: InitialAuthState
}

const persistedFilter = createFilter('auth', ['access', 'refresh'])

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [persistedFilter]
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
