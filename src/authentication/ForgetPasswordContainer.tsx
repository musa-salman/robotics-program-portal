import { Container, Row, Col } from 'react-bootstrap';
import './LoginContainer.css';
import ForgetPassword from './ForgetPassword';

export default function LoginContainer() {
  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col lg={4}>
          <ForgetPassword />
        </Col>
      </Row>
    </Container>
  );
}
