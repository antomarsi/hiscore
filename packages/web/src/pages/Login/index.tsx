import React from 'react'
import { Container, FormSignIn } from './styles'
import { Button, Form } from 'react-bootstrap'
import querystring from 'querystring'

const Login: React.FC = () => {
  const onSuccess = (response: any) => {
    console.log(response)
    //dispatch(singin(response))
  }
  const onFailure = (response: any) => {
    console.error(response)
  }
  const loginGithub = () => {
    const params = {
      client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT_URL,
      scope: ['read:user'].join(' ')
    }
    window.location.href = `https://github.com/login/oauth/authorize?${querystring.stringify(
      params
    )}`
  }
  return (
    <Container>
      <FormSignIn>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <Button size="lg" variant="primary" block onClick={loginGithub}>
          Sign in with Github
        </Button>
        <Button size="lg" variant="primary" block>
          Sign in with Google
        </Button>
      </FormSignIn>
    </Container>
  )
}

export default Login
