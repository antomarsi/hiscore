import styled from 'styled-components'
import { Col } from 'react-bootstrap'

export const SidebarWrapper = styled(Col).attrs(props => ({
  xs: 2
}))`
  min-height: 100vh !important;
  width: 100vw;
  margin-left: -1rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
  .sidebar-heading {
    padding: 0.875rem 1.25rem;
    font-size: 1.2rem;
  }
`
export const ContentPageWrapper = styled(Col).attrs(props => ({
  xs: 10,
  className: "pt-3"
}))`
  min-width: 0;
  width: 100%;
`
