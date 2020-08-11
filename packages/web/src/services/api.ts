import axios from 'axios'

import store from 'src/store'
import { AuthCreators } from 'src/store/ducks/auth/types'
import { NotificationCreators } from 'src/store/ducks/notification/types'
import { notificationError } from 'src/utils/handleMessages'
import { push } from 'connected-react-router'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    const {
      auth: { token }
    } = store.store.getState()

    if (token) config.headers.authorization = `BEARER ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  response => {
    if (response.headers['x-auth-token'])
      store.store.dispatch(
        AuthCreators.authTokenUpdate(response.headers['x-auth-token'])
      )
    return response
  },
  error => {
    if (error.response.status === 401) {
      store.store.dispatch(AuthCreators.authReset())
      store.store.dispatch(push('/login'))
    }
    const notification = notificationError(error)
    if (notification) {
      store.store.dispatch(NotificationCreators.addNotification(notification))
    }
    return Promise.reject(error)
  }
)

export default api
