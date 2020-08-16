import React from 'react'

// import { Container } from './styles';
import { Card, Button } from 'react-bootstrap'
import { MdRefresh } from 'react-icons/md'

const Dashboard: React.FC = () => {
  return (
    <Card>
      <Card.Header as="h3">
        Dashboard
        <Button
          className="float-right"
          onClick={() => {
            //dispatch(Creators.gameIndexRequest())
          }}
        >
          <MdRefresh size={24} />
        </Button>
      </Card.Header>
      <Card.Body></Card.Body>
    </Card>
  )
}

export default Dashboard
