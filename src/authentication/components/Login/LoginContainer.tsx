import LoginButton from './Login';
import { Container, Row, Col } from 'react-bootstrap';

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
