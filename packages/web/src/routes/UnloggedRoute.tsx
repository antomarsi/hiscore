import React from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'src/store'
import { Route, Redirect } from 'react-router-dom'

const UnloggedRoute: React.SFC<any> = ({ component, ...rest }: any) => {
  const isAuthenticated = useSelector(
    (state: ApplicationState) =>
      state.auth.data !== undefined && state.auth.data.token
  )
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  )
}

export default UnloggedRoute
