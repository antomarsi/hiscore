import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import Table from 'src/components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'src/store'
import { Creators } from 'src/store/ducks/game/types'
import { Link } from 'react-router-dom'
import { MdAdd, MdCheck, MdCancel, MdEdit, MdDelete } from 'react-icons/md'

// import { Container } from './styles';

const Games: React.SFC = () => {
  const { loading, data } = useSelector(
    (state: ApplicationState) => state.game.index
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Creators.gameIndexRequest())
  }, [dispatch])

  return (
    <Card>
      <Card.Header as="h3">
        Your Games
        <Button
          as={Link}
          to="/games/new"
          className="float-right"
          variant="success"
        >
          <MdAdd size={24} />
        </Button>
      </Card.Header>
      <Card.Body>
        <Table
          header={[
            'Name',
            'Number of Leaderboards',
            'Authentication Enabled',
            'ApiKey',
            'Actions'
          ]}
          loading={loading}
          values={data.map(game => [
            game.name,
            game.leaderboardCounts,
            <span
              className={
                game.useAuthentication ? 'text-success' : 'text-danger'
              }
            >
              {game.useAuthentication ? <MdCheck /> : <MdCancel />}
            </span>,
            'hidden',
            <span>
              <Button as={Link} to={`/games/edit/${game.id}`}>
                <MdEdit />
              </Button>
              <Button variant="danger">
                <MdDelete />
              </Button>
            </span>
          ])}
          noDataMessage={
            <span>
              No game found.{' '}
              <Link to="/games/new">Click here to create a game here.</Link>
            </span>
          }
        />
      </Card.Body>
    </Card>
  )
}

export default Games
