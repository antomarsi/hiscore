import React, { useState } from 'react'
import {
  Container,
  Wrapper,
  ToastNotification,
  ToastNotificationHeader,
  ToastNotificationBody
} from './styles'
import { Variant } from 'react-bootstrap/esm/types'
import {
  MdReportProblem,
  MdErrorOutline,
  MdDone,
  MdInfoOutline
} from 'react-icons/md'
import { IconBaseProps, IconType } from 'react-icons/lib'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'src/store'
import { Creators } from 'src/store/ducks/notification/types'

export interface NotificationItemStyleProps {
  variant?: Variant
  animation?: boolean
  autohide?: boolean
  delay?: number
  title: string
  subtitle?: string
  body?: string | React.ReactNode
  icon?: IconType
}

type NotificationItemProps = NotificationItemStyleProps & {
  onClose: () => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  variant,
  title,
  subtitle,
  body,
  icon,
  ...props
}) => {
  const [show, setShow] = useState(true)
  if (!icon) {
    switch (variant) {
      case 'success':
        icon = MdDone
        break
      case 'danger':
        icon = MdErrorOutline
        break
      case 'warning':
        icon = MdReportProblem
        break
      case 'info':
        icon = MdInfoOutline
        break
      default:
        break
    }
  }

  return (
    <ToastNotification
      variant={variant}
      {...props}
      show={show}
      onClose={() => {
        setShow(false)
        props.onClose()
      }}
    >
      <ToastNotificationHeader variant={variant}>
        {icon &&
          React.createElement<IconBaseProps>(icon, {
            size: '2em'
          })}
        <strong>{title}</strong>
        {subtitle && <small>{subtitle}</small>}
      </ToastNotificationHeader>
      {body && (
        <ToastNotificationBody variant={variant}>{body}</ToastNotificationBody>
      )}
    </ToastNotification>
  )
}

NotificationItem.defaultProps = {
  autohide: true,
  delay: 3000
}

const Notifications: React.FC = () => {
  const notificationsArray = useSelector(
    (state: ApplicationState) => state.notification.notifications
  )
  const dispatch = useDispatch()

  return (
    <Container>
      <Wrapper>
        {notificationsArray.map((v, index) => (
          <NotificationItem
            key={index}
            onClose={() => dispatch(Creators.removeNotification(index))}
            {...v}
          />
        ))}
      </Wrapper>
    </Container>
  )
}

export default Notifications
