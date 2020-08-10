import React, { useEffect } from 'react'
import { Card, Button, Accordion } from 'react-bootstrap'
import Table from 'src/components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'src/store'
import { Creators } from 'src/store/ducks/game/types'
import { Link } from 'react-router-dom'
import {
  MdAdd,
  MdCheck,
  MdCancel,
  MdEdit,
  MdDelete,
  MdContentCopy,
  MdRefresh,
  MdStar,
  MdStarBorder
} from 'react-icons/md'
import Swal from 'sweetalert2'
import { NotificationCreators } from 'src/store/ducks/notification/types'

// import { Container } from './styles';

const Games: React.SFC = () => {
  const { loading, data } = useSelector(
    (state: ApplicationState) => state.game.index
  )
  const { loading: favLoading } = useSelector(
    (state: ApplicationState) => state.game.favorited
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Creators.gameIndexRequest())
  }, [dispatch])
  const copyToClipboard = (apikey: string) => {
    navigator.clipboard.writeText(apikey)
    dispatch(
      NotificationCreators.addNotification({
        variant: 'light',
        title: 'Copied ApiKey to clipboard',
        icon: MdContentCopy
      })
    )
  }

  return (
    <Card>
      <Card.Header as="h3">
        Your Games
        <Button
          className="float-right"
          onClick={() => {
            dispatch(Creators.gameIndexRequest())
          }}
        >
          <MdRefresh size={24} />
        </Button>
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
          empty={data.length === 0}
          noDataMessage={
            <span>
              No game found.{' '}
              <Link to="/games/new">Click here to create a game here.</Link>
            </span>
          }
        >
          {data.map(game => (
            <tr>
              <td>{game.name}</td>
              <td>{game.leaderboards?.length}</td>
              <td
                className={
                  game.useAuthentication ? 'text-success' : 'text-danger'
                }
              >
                {game.useAuthentication ? <MdCheck /> : <MdCancel />}
              </td>
              <td>
                <Button
                  variant="outline-dark"
                  onClick={() => copyToClipboard(game.apiKey!)}
                >
                  <MdContentCopy />
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    dispatch(
                      Creators.gameFavoritedRequest(game.id, !game.favorited)
                    )
                  }}
                  disabled={favLoading.indexOf(game.id!) >= 0}
                >
                  {game.favorited ? (
                    <MdStar className="text-warning" />
                  ) : (
                    <MdStarBorder />
                  )}
                </Button>
                <Button as={Link} to={`/games/edit/${game.id}`}>
                  <MdEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure!',
                      text:
                        'Do you really want to delete it? Every leaderboard in this game will be delete, with no return',
                      icon: 'warning',
                      confirmButtonText: 'Yes, i want to delete it',
                      showCancelButton: true,
                      cancelButtonText: 'Cancel'
                    }).then(result => {
                      if (result.value) {
                        dispatch(Creators.gameDeleteRequest(game.id))
                      }
                    })
                  }}
                >
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card.Body>
    </Card>
  )
}

export default Games
