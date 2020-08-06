import { createReducer } from 'reduxsauce'
import { InitialState as INITIAL_STATE, Types } from './types'

export default createReducer(INITIAL_STATE, {
  [Types.ADD_NOTIFICATION]: (state = INITIAL_STATE, { data }) => ({
    notifications: [...state.notifications, data]
  }),
  [Types.REMOVE_NOTIFICATION]: (state = INITIAL_STATE, { index }) => ({
    notifications: state.notifications.splice(index, 1)
  })
})
