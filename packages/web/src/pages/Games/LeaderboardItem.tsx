import React from 'react'
import { FormikProps } from 'formik'
import { Leaderboard } from './../../store/ducks/game/types'
import { Card, Accordion, Button } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import Input from './../../components/Form/Input'
import { LEADERBOARD_CONSTS } from './../../utils/constants'

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
}) => (
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
          name={`leaderboards[${key}].resetMethod`}
          label="Reset Method"
          inputProps={{ as: 'select' }}
        >
          {Object.values(LEADERBOARD_CONSTS.RESET_METHOD).map(v => (
            <option value={v.value}>{v.label}</option>
          ))}
        </Input>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
)
export default LeaderboardItem
