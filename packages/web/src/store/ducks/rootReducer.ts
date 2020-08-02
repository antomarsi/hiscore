import { combineReducers, Reducer } from 'redux'
import auth from './auth'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { ApplicationState } from '..'

const createRootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    auth,
    router: connectRouter(history) as Reducer
  })

export default createRootReducer
