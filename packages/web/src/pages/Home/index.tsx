import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const Home: React.FC = () => {
  return (
    <Row>
      <Col xs={12} className="mt-5">
        <Card>
          <Card.Header>
            <h1>A Simple Hi-Score Api for your Jams</h1>
          </Card.Header>
          <Card.Body>
            <p>
              This is a simple api for storing scores. The idea for this projec
              come from a game jam that needed a leaderboard. So that is what i
              did it.
            </p>
            <p>
              The idea is to make a simple api that can host multiples "Games".
              So you can use one account for your multiples GameJams entries.
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Home
