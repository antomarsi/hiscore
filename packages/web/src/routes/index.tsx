import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ConnectedRouter, RouterState } from 'connected-react-router'
import history from './history'
import { ApplicationState } from './../store'
import NotFoundPage from './../pages/NotFound/index'
import LoginPage from './../pages/Login'
import Header from './../components/Header'
import { Container } from 'react-bootstrap'
import About from './../pages/About'
import GodotPlugin from './../pages/GodotPlugin'
import Github from './../pages/Github'
import Home from './../pages/Home/index'
import PrivateRoute from './PrivateRoute'
import Dashboard from 'src/pages/Dashboard'

const Routes: React.SFC<{}> = props => {
  const location = useSelector(
    (state: ApplicationState) => (state.router as RouterState).location
  )
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Container fluid className="h-100">
        <Switch location={location}>
          <PrivateRoute exact path="dashboard" component={Dashboard} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/github" component={Github} />
          <Route exact path="/godot-plugin" component={GodotPlugin} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Container>
    </ConnectedRouter>
  )
}

export default Routes
