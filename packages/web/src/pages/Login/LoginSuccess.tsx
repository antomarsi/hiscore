import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import querystring from 'querystring'
import { Spinner } from 'react-bootstrap'
import { Container, FormSignIn } from './styles'
import { useDispatch } from 'react-redux'
import { Creators } from '../../store/ducks/auth/types'

interface OwnProps {}

type Props = OwnProps & RouteComponentProps<{ provider: string }>

const LoginSuccess: React.SFC<Props> = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    const queryParams = querystring.parse(
      props.location.search.replace(/^\?/g, '')
    )
    const provider = props.match.params.provider
    if (!queryParams.code) {
      props.history.push('/login')
    } else {
      switch (provider) {
        case 'google':
          dispatch(Creators.authSignInGoogleRequest(queryParams.code))
          break
        case 'github':
          dispatch(Creators.authSignInGithubRequest(queryParams.code))
          break
        default:
          props.history.push('/login')
          break
      }
    }
  }, [props.match.params, props.location.search])

  return (
    <Container>
      <FormSignIn>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        Authenticating
      </FormSignIn>
    </Container>
  )
}

export default LoginSuccess
