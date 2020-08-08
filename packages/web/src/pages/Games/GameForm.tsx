import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

// import { Container } from './styles';
import { Card, Button, Form } from 'react-bootstrap'
import { Formik, Form as FormikForm, FormikProps } from 'formik'
import * as yup from 'yup'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'src/store'
import { push } from 'connected-react-router'
import { GameCreators } from 'src/store/ducks/game/types'

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

const GameFormContent: React.SFC<FormikProps<FormValues>> = ({
  isSubmitting,
  ...props
}) => {
  const dispatch = useDispatch()
  const {
    store: { loading: storeLoading },
    showing: { loading: showLoading }
  } = useSelector((state: ApplicationState) => state.game)

  useEffect(() => {
    props.setSubmitting(storeLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeLoading])

  return (
    <Form as={FormikForm}>
      <Card.Body>
        <Input
          name="name"
          inputProps={{ placeholder: 'Name', disabled: showLoading }}
        />
        <Input
          name="description"
          disableValid
          inputProps={{
            disabled: showLoading,
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
            disabled: showLoading,
            type: 'switch'
          }}
        />
      </Card.Body>
      <Card.Footer>
        <Button type="submit" disabled={isSubmitting || showLoading}>
          Save
        </Button>
        <Button
          variant="danger"
          disabled={isSubmitting}
          onClick={() => dispatch(push('/games'))}
        >
          Cancel
        </Button>
      </Card.Footer>
    </Form>
  )
}

const GameForm: React.FC<Props> = props => {
  const isNew = props.match.params.gameId === undefined
  const showingData = useSelector(
    (state: ApplicationState) => state.game.showing.data
  )
  const dispatch = useDispatch()
  const [InitValues, setInitValues] = useState(initialValues)

  useEffect(() => {
    if (!isNew) {
      dispatch(GameCreators.gameShowRequest(Number(props.match.params.gameId)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew])
  useEffect(() => {
    if (!isNew && showingData) {
      setInitValues(showingData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showingData])

  return (
    <Card>
      <Card.Header>
        <h3>{isNew ? 'Create new Game' : 'Edit a game'}</h3>
      </Card.Header>
      <Formik
        onSubmit={values => {
          dispatch(GameCreators.gameStoreRequest(values))
        }}
        enableReinitialize
        initialValues={InitValues}
        validationSchema={validationSchema}
      >
        {values => <GameFormContent {...values} />}
      </Formik>
    </Card>
  )
}

export default GameForm
