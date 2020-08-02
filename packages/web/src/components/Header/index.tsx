import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'src/store'

const Header: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: ApplicationState) => state.auth.data
  )
  return (
    <Navbar variant="dark" bg="dark" className="flex-md-nowrap p-0">
      <Navbar.Brand as={Link} to="/" className="col-sm-3 col-md-2 mr-0">
        Antomarsi Hiscore
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="px-3 ml-auto">
          <Nav.Link as={Link} to="/github">
            Github
          </Nav.Link>
          <Nav.Link as={Link} to="/godot-plugin">
            Godot Plugin
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          {isAuthenticated ? (
            <NavDropdown title="Usuario logado" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login">
              Sign in
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
