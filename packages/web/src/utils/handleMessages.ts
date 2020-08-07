import { NotificationItemStyleProps } from 'src/components/Notifications'
import {
  ApiErrorResponse,
  NETWORK_ERROR,
  SERVER_ERROR,
  TIMEOUT_ERROR
} from 'apisauce'
import { MdSignalWifiOff, MdReport, MdTimerOff } from 'react-icons/md'

export const NetworkError: NotificationItemStyleProps = {
  title: 'Erro na comunicação com o servidor',
  body: 'Network not available.',
  variant: 'danger',
  icon: MdSignalWifiOff
}

export const ServerError: NotificationItemStyleProps = {
  title: 'Server error',
  body: 'Something went wrong, please report the problem',
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
  error: ApiErrorResponse<any>,
  title: string
): NotificationItemStyleProps | undefined => {
  switch (error.problem) {
    case NETWORK_ERROR:
      return NetworkError
    case SERVER_ERROR:
      return ServerError
    case TIMEOUT_ERROR:
      return TimeoutError
    default:
      break
  }
  if (error.status === 401) {
    return undefined
  }
  return { title, body: handleError(error.data), variant: 'danger' }
}
