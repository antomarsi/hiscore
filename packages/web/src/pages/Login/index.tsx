import React from 'react'
import { Container, FormSignIn } from './styles'
import { Button, Form } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login'
import GitHubLogin from 'react-github-login'
import PopupWindow from './LoginPopup'

const Login: React.FC = () => {
  const onSuccess = (response: any) => {
    console.log(response)
    //dispatch(singin(response))
  }
  const onFailure = (response: any) => {
    console.error(response)
  }
  const teste = () => {
    const popup = new PopupWindow(
      'github-auth',
      'http://localhost:3333/api/v1/auth/github/callback'
    )
    popup.then((value: any) => {
      console.log('return', value)
    })
    popup.catch((value: any) => {
      console.log('catch', value)
    })
  }
  return (
    <Container>
      <FormSignIn>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <Button size="lg" variant="primary" block onClick={teste}>
          Sign in with Github
        </Button>
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
