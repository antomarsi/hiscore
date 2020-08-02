import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ErrorContainer } from './styles'

const NotFoundPage: React.SFC<{}> = () => {
  return (
    <Container>
      <Row>
        <Col>
          <ErrorContainer>
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <Button as={Link} to="/">
                Take Me Home{' '}
              </Button>
            </div>
          </ErrorContainer>
        </Col>
      </Row>
    </Container>
  )
}
export default NotFoundPage
