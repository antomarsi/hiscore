import styled from 'styled-components'
import { Col, ColProps } from 'react-bootstrap'

export const Container = styled(Col).attrs(props => ({
  bg: 'light',
  md: 2,
  className: [props.className, 'd-none', 'd-md-block'].join(' ')
}))`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
`

export const SidebarSticky = styled.div`
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
`
