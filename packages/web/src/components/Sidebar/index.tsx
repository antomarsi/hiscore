import React from 'react'
import { Nav } from 'react-bootstrap'

import { Container, SidebarSticky } from './styles'
import { Link } from 'react-router-dom'
import { IconType } from 'react-icons/lib'
import {
  MdHome,
  MdVideogameAsset,
  MdSettings,
  MdAccountCircle,
  MdExitToApp,
  MdBook,
  MdDashboard
} from 'react-icons/md'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'src/store'

interface SidebarProps {
  title: string
  path: string
  icon?: IconType
}

const SidebarItem: React.FC<SidebarProps> = props => (
  <Nav.Item>
    <Nav.Link as={Link} eventKey={props.path} to={props.path}>
      {props.icon && React.createElement(props.icon, { className: 'mb-1' })}
      <span className="ml-2">{props.title}</span>
    </Nav.Link>
  </Nav.Item>
)

const Sidebar: React.FC = () => {
  const location = useSelector(
    (state: ApplicationState) => state.router?.location
  )
  return (
    <>
      <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
        <MdHome />
        <span>General</span>
      </h6>
      <Nav
        className="flex-column"
        variant="pills"
        activeKey={location?.pathname}
      >
        <SidebarItem path="/dashboard" title="Dashboard" icon={MdDashboard} />
        <SidebarItem path="/games" title="Games" icon={MdVideogameAsset} />
        <SidebarItem
          path="/documentation"
          title="Documentation"
          icon={MdBook}
        />
      </Nav>

      <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
        <MdSettings />
        <span>Settings</span>
      </h6>
      <Nav
        className="flex-column"
        variant="pills"
        activeKey={location?.pathname}
      >
        <SidebarItem path="/account" title="Account" icon={MdAccountCircle} />
        <SidebarItem path="/logout" title="Logout" icon={MdExitToApp} />
      </Nav>
    </>
  )
}

export default Sidebar
