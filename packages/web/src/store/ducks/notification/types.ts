import { createActions } from 'reduxsauce'
import { NotificationItemStyleProps } from 'src/components/Notifications'

export const { Types, Creators } = createActions({
  // Index
  addNotification: ['data'],
  removeNotification: ['index']
})

/**
 * State type
 */
export interface NotificationState {
  readonly notifications: NotificationItemStyleProps[]
}

export const InitialState: NotificationState = {
  notifications: []
}
export const NotificationCreators = Creators
