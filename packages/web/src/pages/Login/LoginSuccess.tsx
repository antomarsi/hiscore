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
    console.log('teste')
    const queryParams = querystring.parse(
      props.location.search.replace(/^\?/g, '')
    )
    console.log(queryParams)
    const provider = props.match.params.provider
    if (!queryParams.code) {
      props.history.replace('/login')
    } else {
      dispatch(Creators.authSignInRequest(queryParams.code, provider))
    }
  }, [])

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
