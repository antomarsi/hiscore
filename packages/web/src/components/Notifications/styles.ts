import styled from 'styled-components'
import { Toast } from 'react-bootstrap'

export const Container = styled.div.attrs(props => ({
  'aria-live': 'polite',
  'aria-atomic': 'true'
}))`
  position: relative;
  z-index: 999;
`
export const Wrapper = styled.div`
  position: absolute;
  right: 5px;
  top: 10px;
`

export const ToastNotification = styled(Toast).attrs(props => {
  var classNames = [props.className]
  if (props.variant) {
    classNames.push(`bg-${props.variant}`)
  }
  return { className: classNames.join(' ') }
})``
export const ToastNotificationHeader = styled(Toast.Header).attrs(props => {
  var classNames = [props.className]
  if (props.variant) {
    classNames.push(
      `text-${props.variant === 'light' ? 'dark' : props.variant}`
    )
  }
  return { className: classNames.join(' ') }
})`
  & > svg {
    margin-right: 5px;
  }
  & > strong {
    margin-right: auto;
  }
  & > small {
    margin-left: 5px;
  }
`
export const ToastNotificationBody = styled(Toast.Body).attrs(props => {
  var classNames = [props.className]
  if (['light', 'warning', undefined].indexOf(props.variant) !== -1) {
    classNames.push('text-dark')
  } else {
    classNames.push('text-white')
  }
  return { className: classNames.join(' ') }
})``
