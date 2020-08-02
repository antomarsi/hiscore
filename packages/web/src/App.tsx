import React from 'react'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from './store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  )
}

export default App
