import React from 'react'
import { Container, FormSignIn } from './styles'
import { Button, Form } from 'react-bootstrap'
import querystring from 'querystring'

const Login: React.FC = () => {
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
  const googleGithub = () => {
    const params = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
      response_type: "code",
      scope: ['https://www.googleapis.com/auth/userinfo.profile'].join(' ')
    }
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(
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
        <Button size="lg" variant="primary" block onClick={googleGithub}>
          Sign in with Google
        </Button>
      </FormSignIn>
    </Container>
  )
}

export default Login
