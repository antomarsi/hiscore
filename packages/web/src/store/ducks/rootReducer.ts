import { combineReducers, Reducer } from 'redux'
import auth from './auth'
import game from './game'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { ApplicationState } from '..'

const createRootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    auth,
    game,
    router: connectRouter(history) as Reducer
  })

export default createRootReducer
