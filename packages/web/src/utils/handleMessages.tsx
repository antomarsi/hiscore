import React from 'react'
import { NotificationItemStyleProps } from 'src/components/Notifications'
import { MdSignalWifiOff, MdReport, MdTimerOff } from 'react-icons/md'
import store from 'src/store'
import { NotificationCreators } from 'src/store/ducks/notification/types'

export const NetworkError: NotificationItemStyleProps = {
  title: 'Erro na comunicação com o servidor',
  body: 'Network not available.',
  variant: 'danger',
  icon: MdSignalWifiOff
}

export const ServerError: NotificationItemStyleProps = {
  title: 'Server error',
  body: (
    <span>
      Something went wrong,{' '}
      <a
        href="https://github.com/antomarsi/hiscore/issues"
        target="_blank"
        className={'text-white'}
        rel="noopener noreferrer"
      >
        <u>please report the problem</u>
      </a>
    </span>
  ),
  autohide: false,
  variant: 'danger',
  icon: MdReport
}

export const ConnectionError: NotificationItemStyleProps = {
  title: 'Connection error',
  body: 'Server not available, bad DNS',
  variant: 'danger',
  icon: MdReport
}

export const TimeoutError: NotificationItemStyleProps = {
  title: 'Timeout error',
  body: "Server didn't respond in time.",
  variant: 'danger',
  icon: MdTimerOff
}

export const handleError = (error: any) => {
  if (typeof error === 'string') {
    return error
  }
  if (error.message) {
    return error.message
  }
  return null
}

export const notificationError = (
  error: any,
  title = 'Um erro ocorreu'
): NotificationItemStyleProps | undefined => {
  if (!error.response) {
    if (error.message === 'ECONNABORTED') {
      return TimeoutError
    }
    return NetworkError
  }
  if (error.response.status === 500) {
    return ServerError
  }
  if (error.status === 401) {
    return undefined
  }
  return { title, body: handleError(error.data), variant: 'danger' }
}

export const dispatchNotification = (error: any, title = 'Um erro ocorreu') => {
  const notification = notificationError(error, title)
  if (notification)
    store.store.dispatch(NotificationCreators.addNotification(notification))
}
