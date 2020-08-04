import React from 'react'
import { Container, FormSignIn } from './styles'
import { Button, Form } from 'react-bootstrap'

const Login: React.FC = () => {

  return (
    <Container>
      <FormSignIn>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <Button size="lg" variant="primary" block onClick={() => {

        }}>
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
