import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RoleBasedAccessControl from '../../authentication/components/RoleBasedAccessControl';
import LogoutButton from '../../authentication/components/Logout';
import { ALLOW_AUTHED_ROLES } from '../../authentication/components/Roles';

type HeaderProps = {
  logo: string;
  links: { name: string; path: string }[];
};

const Header: React.FC<HeaderProps> = ({ logo, links }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand as={Link} to="/">
            <img src={logo} height="40" className="d-inline-block align-top" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {links.map((link) => (
                <Nav.Item key={link.name}>
                  <Nav.Link as={Link} to={link.path}>
                    {link.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
          <RoleBasedAccessControl
            allowedRoles={ALLOW_AUTHED_ROLES}
            unauthorizedUnauthenticatedComponent={
              <Link to="/login" className="btn btn-primary text-white px-4" style={{ borderRadius: '20px' }}>
                התחברות
              </Link>
            }
            unauthorizedAuthenticatedComponent={<> </>}
            children={<LogoutButton />}
          />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
