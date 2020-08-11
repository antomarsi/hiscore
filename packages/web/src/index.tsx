import React from 'react'
import ReactDOM from 'react-dom'
import './assets/sass/index.scss'
import 'sweetalert2/src/sweetalert2.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { gridSystem } from './utils/develop'

if (process.env.NODE_ENV === 'development') gridSystem()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
