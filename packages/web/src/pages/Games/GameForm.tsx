import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

// import { Container } from './styles';
import { Card, Button, Form, Accordion } from 'react-bootstrap'
import { Formik, Form as FormikForm, FormikProps, FieldArray } from 'formik'
import * as yup from 'yup'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'src/store'
import { push } from 'connected-react-router'
import { GameCreators, Leaderboard } from 'src/store/ducks/game/types'
import { MdAdd } from 'react-icons/md'
import LeaderboardItem from './LeaderboardItem'

type Props = RouteComponentProps<{ gameId?: string }>

interface FormValues {
  id?: number
  name: string
  description: string
  useAuthentication: boolean
  leaderboards?: Leaderboard[]
}

const initialValues: FormValues = {
  name: '',
  description: '',
  useAuthentication: false,
  leaderboards: []
}

const validationSchema = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required(),
  description: yup.string(),
  useAuthentication: yup.boolean(),
  leaderboards: yup.array().of(
    yup.object({
      id: yup.number().nullable(),
      name: yup.string().required(),
      resetMethod: yup.string().nullable()
    })
  )
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
        <FieldArray name="leaderboards">
          {({ form, push, remove }) => (
            <Card>
              <Card.Header as="h5">
                Leaderboards{' '}
                <span
                  className={
                    props.values.leaderboards!.length >= 3 ? 'text-danger' : ''
                  }
                >
                  {props.values.leaderboards?.length}/3
                </span>
                <Button
                  variant="success"
                  className="float-right"
                  disabled={props.values.leaderboards!.length >= 3}
                  onClick={() =>
                    push({
                      name: 'New Leaderboard'
                    })
                  }
                >
                  <MdAdd />
                </Button>
              </Card.Header>
              <Card.Body>
                <Accordion defaultActiveKey={'-1'}>
                  {props.values.leaderboards?.map((v, index) => (
                    <LeaderboardItem
                      value={v}
                      form={form}
                      key={index}
                      index={index}
                      removeHandler={() => {
                        remove(index)
                      }}
                    />
                  ))}{' '}
                </Accordion>
              </Card.Body>
            </Card>
          )}
        </FieldArray>
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
  const showing = useSelector((state: ApplicationState) => state.game.showing)
  const dispatch = useDispatch()
  const [InitValues, setInitValues] = useState(initialValues)

  useEffect(() => {
    if (!isNew) {
      dispatch(GameCreators.gameShowRequest(Number(props.match.params.gameId)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew])
  useEffect(() => {
    if (!isNew && showing.data) {
      setInitValues(showing.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showing])

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
