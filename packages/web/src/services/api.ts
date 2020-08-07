import { create } from 'apisauce'
import store from './../store'
import { Creators } from '../store/ducks/auth/types'
import history from 'src/routes/history'

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Encoding': 'gzip'
  },
  validateStatus: function (status: number) {
    if (status === 401) {
      store.store.dispatch(Creators.authReset())
      history.replace('/app')
      return false
    }
    return true
  }
})

api.addRequestTransform(request => {
  const {
    auth: { token }
  } = store.store.getState()

  if (token) request.headers['Authorization'] = `BEARER ${token}`
})

api.addResponseTransform((response) => {
  var newToken = response.headers ? response.headers["X-Auth-Token"] : null
  if (newToken) {
    store.store.dispatch(
      Creators.authTokenUpdate(newToken)
    )
  }
})

export default api
