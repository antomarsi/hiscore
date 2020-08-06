import { combineReducers, Reducer } from 'redux'
import auth from './auth'
import game from './game'
import notification from './notification'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { ApplicationState } from '..'

const createRootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    auth,
    game,
    notification,
    router: connectRouter(history) as Reducer
  })

export default createRootReducer
