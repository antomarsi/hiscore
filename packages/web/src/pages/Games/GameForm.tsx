import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

// import { Container } from './styles';
import { Card, Button, Form, Accordion } from 'react-bootstrap'
import {
  Formik,
  Form as FormikForm,
  FormikProps,
  FieldArray,
  getIn,
  FieldArrayRenderProps,
  FieldArrayConfig
} from 'formik'
import * as yup from 'yup'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'src/store'
import { push } from 'connected-react-router'
import { GameCreators, Leaderboard, Game } from 'src/store/ducks/game/types'
import { LEADERBOARD_CONSTS } from 'src/utils/constants'
import { MdAdd, MdDelete } from 'react-icons/md'

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
  useAuthentication: false
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
      saveMethod: yup
        .string()
        .oneOf(Object.values(LEADERBOARD_CONSTS.SAVE_METHODS).map(v => v.value))
        .required(),
      resetMethod: yup
        .string()
        .oneOf(Object.values(LEADERBOARD_CONSTS.RESET_METHOD).map(v => v.value))
        .nullable()
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
                <Button
                  variant="success"
                  className="float-right"
                  onClick={() => push({ name: 'New Leaderboard' })}
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

interface LeaderboardItemProps {
  form: FormikProps<any>
  value: Leaderboard
  index: number
  removeHandler: () => void
}

const LeaderboardItem: React.SFC<LeaderboardItemProps> = ({
  value,
  form,
  index: key,
  removeHandler
}) => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle eventKey={key.toString()} as={Button} variant="link">
          {value.name}{' '}
        </Accordion.Toggle>
        <Button variant="danger" className="float-right" onClick={removeHandler}>
          <MdDelete />{' '}
        </Button>
      </Card.Header>
      <Accordion.Collapse eventKey={key.toString()}>
        <Card.Body>
          <Input
            label={'Name'}
            name={`leaderboards[${key}].name`}
            inputProps={{ placeholder: 'Name' }}
          />
          <Input
            name={`leaderboards[${key}].saveMethod`}
            label="Save Method"
            inputProps={{ as: 'select' }}
          >
            {Object.values(LEADERBOARD_CONSTS.SAVE_METHODS).map(v => (
              <option value={v.value}>{v.label}</option>
            ))}
          </Input>
          <Input
            name={`leaderboards[${key}].resetMethod`}
            label="Reset Method"
            inputProps={{ as: 'select' }}
          >
            {Object.values(LEADERBOARD_CONSTS.RESET_METHOD).map(v => (
              <option value={v.value}>{v.label}</option>
            ))}
          </Input>
          {JSON.stringify(form)}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
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
