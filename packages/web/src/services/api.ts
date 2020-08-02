import { create } from 'apisauce'

import store from './../store'

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Encoding': 'gzip'
  },
  validateStatus: function (status: number) {
    if (status === 401) {
      window.localStorage.clear()
      window.location.replace('/app')
      return false
    }
    return true
  }
})

api.addRequestTransform(request => {
  const {
    auth: { data }
  } = store.store.getState()

  if (data?.token) request.headers['Authorization'] = `BEARER ${data.token}`
})

export default api
