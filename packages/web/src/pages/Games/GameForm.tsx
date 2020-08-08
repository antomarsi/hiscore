import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'

// import { Container } from './styles';
import { Container, Card, Button, Form, Col } from 'react-bootstrap'
import { Formik, Form as FormikForm } from 'formik'
import * as yup from 'yup'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'

type Props = RouteComponentProps<{ gameId?: string }>

interface FormValues {
  id?: number
  name: string
  description: string
  useAuthentication: boolean
}

const initialValues: FormValues = {
  name: '',
  description: '',
  useAuthentication: false
}

const validationSchema = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required(),
  description: yup.string(),
  useAuthentication: yup.boolean()
})

const GameForm: React.FC<Props> = props => {
  const isNew = props.match.params.gameId === undefined
  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>{isNew ? 'Create new Game' : 'Edit a game'}</h3>
        </Card.Header>
        <Formik
          onSubmit={values => {
            console.log(values)
          }}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {props => (
            <Form as={FormikForm}>
              <Card.Body>
                <Input name="name" inputProps={{ placeholder: 'Name' }} />
                <Input
                  name="description"
                  disableValid
                  inputProps={{
                    placeholder: 'Description',
                    as: 'textarea',
                    rows: 3
                  }}
                />
                <Check
                  name="useAuthentication"
                  label={'Need user authentication'}
                  disableValid
                  inputProps={{
                    type: 'switch'
                  }}
                />
              </Card.Body>
              <Card.Footer>
                <Button type="submit">Save</Button>
                <Button as={Link} to="/games" variant="danger">
                  Cancel
                </Button>
              </Card.Footer>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  )
}

export default GameForm
