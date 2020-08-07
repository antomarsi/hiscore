import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'src/store'
import { AuthCreators } from 'src/store/ducks/auth/types'

const Header: React.FC = () => {
  const authData = useSelector((state: ApplicationState) => state.auth)
  const dispatch = useDispatch()
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
          {authData.user ? (
            <NavDropdown
              title={authData.user.displayName}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Games</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => dispatch(AuthCreators.authReset())}
              >
                Logout
              </NavDropdown.Item>
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
