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
import UnloggedRoute from './UnloggedRoute'

const Routes: React.SFC<{}> = props => {
  const location = useSelector(
    (state: ApplicationState) => (state.router as RouterState).location
  )
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Container fluid>
        <Switch location={location}>
          <UnloggedRoute exact path="/" component={Home} />
          <UnloggedRoute exact path="/login" component={LoginPage} />
          <UnloggedRoute exact path="/about" component={About} />
          <UnloggedRoute exact path="/github" component={Github} />
          <UnloggedRoute exact path="/godot-plugin" component={GodotPlugin} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Container>
    </ConnectedRouter>
  )
}

export default Routes
