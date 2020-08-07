import React, { useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import Table from 'src/components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'src/store'
import { Creators } from 'src/store/ducks/game/types'

// import { Container } from './styles';

const Games: React.FC = () => {
  const { loading, data } = useSelector((state: ApplicationState) => state.game)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Creators.gameIndexRequest())
  }, [])

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Your Games</h3>
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
              0,
              game.useAuthentication,
              'hidden',
              'Edit/Destroy'
            ])}
          />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Games
