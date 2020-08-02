import React from 'react'
import { Container, FormControl, FormSignIn } from './styles'
import { Button, Form } from 'react-bootstrap'

const Login: React.FC = () => {
  return (
    <Container>
      <FormSignIn>
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <Form.Group controlId="formEmail">
          <Form.Label srOnly>Email address</Form.Label>
          <FormControl
            type="email"
            placeholder="Enter email"
            required
            autoFocus
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label srOnly>Email address</Form.Label>
          <FormControl type="password" placeholder="Password" required />
        </Form.Group>
        <Button size="lg" variant="primary" block type="submit">
          Sign in
        </Button>
      </FormSignIn>
    </Container>
  )
}

export default Login
