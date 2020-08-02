import React from 'react'
import { useSelector } from 'react-redux';
import { ApplicationState } from 'src/store';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Sidebar from 'src/components/Sidebar';

const PrivateRoute: React.SFC<any> = ({ component, ...rest }: any) => {
  const isAuthenticated = useSelector(
    (state: ApplicationState) => state.auth.data
  )
  return (
    <Route
      {...rest}
      render={(props: RouteProps) =>
        isAuthenticated ? (
          <Row>
            <Sidebar />
            {React.createElement(component, props)}
          </Row>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
