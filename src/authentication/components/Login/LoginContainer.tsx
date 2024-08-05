import LoginButton from './Login';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Renders the login container component.
 *
 * @returns The rendered login container component.
 */
export default function LoginContainer() {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center vh-100">
        <Col lg={4}>
          <LoginButton />
        </Col>
      </Row>
    </Container>
  );
}
