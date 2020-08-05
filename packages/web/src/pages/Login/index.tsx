import React from 'react'
import { Container, FormSignIn } from './styles'
import { Button, Form } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login'
import GitHubLogin from 'react-github-login'

const Login: React.FC = () => {
  const onSuccess = (response: any) => console.log(response)
  const onFailure = (response: any) => console.error(response)
  return (
    <Container>
      <FormSignIn>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <Button size="lg" variant="primary" block onClick={() => {}}>
          Sign in with Github
        </Button>
        <GitHubLogin
          clientId={process.env.REACT_APP_GITHUB_CLIENT_ID!}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={({ onClick, disabled }) => (
            <Button
              size="lg"
              variant="primary"
              block
              onClick={onClick}
              disabled={disabled}
            >
              Sign in with Google
            </Button>
          )}
        />
        ,
      </FormSignIn>
    </Container>
  )
}

export default Login
