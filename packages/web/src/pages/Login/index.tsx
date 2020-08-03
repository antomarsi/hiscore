import React from 'react'
import { Container, FormControl, FormSignIn } from './styles'
import { Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

const Login: React.FC = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={schema}
        onSubmit={values => {
          console.log(values)
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors
        }) => (
          <FormSignIn noValidate onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <Form.Group controlId="formEmail">
              <Form.Label srOnly>Email address</Form.Label>
              <FormControl
                type="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label srOnly>Email address</Form.Label>
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
            </Form.Group>
            <Button size="lg" variant="primary" block type="submit">
              Sign in
            </Button>
          </FormSignIn>
        )}
      </Formik>
    </Container>
  )
}

export default Login
