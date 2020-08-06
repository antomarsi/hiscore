import { NotificationItemStyleProps } from 'src/components/Notifications'

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
  title: string
): NotificationItemStyleProps => {
  return { title, body: handleError(error), variant: 'danger' }
}
