import Login from './Login';
import { Container, Row, Col } from 'react-bootstrap';
import './LoginContainer.css';

export default function LoginContainer() {
  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col lg={4}>
          <Login />
        </Col>
      </Row>
    </Container>
  );
}
