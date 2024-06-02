import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type HeaderProps = {
  logo: string;
  links: { name: string; path: string }[];
};

const Header: React.FC<HeaderProps> = ({ logo, links }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} height="40" className="d-inline-block align-top" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {links.map((link) => (
              <Container key={link.name}>
                <Nav.Link as={Link} to={link.path}>
                  {link.name}
                </Nav.Link>
              </Container>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
