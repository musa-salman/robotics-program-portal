import React from 'react';
import { AppBar, Toolbar, Container, Box, Avatar } from '@mui/material';
import AvatarMenu from './AvatarMenu';
import './Header.css';
import LoginButton from '../../authentication/components/Login/Login';
import { useAuth } from '../../authentication/services/useAuth';
import { Link } from 'react-router-dom';

interface HeaderProps {
  logo: string;
  links: { name: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ logo, links }) => {
  const { user } = useAuth();

  return (
    <header>
      <AppBar position="static" color="secondary">
        <Container>
          <Toolbar>
            <Avatar alt="Logo" src={logo} sx={{ width: 40, height: 40 }} />
            <nav className="nav-links">
              {links.map((link) => (
                <Link key={link.name} to={link.path}>
                  {link.name}
                </Link>
              ))}
            </nav>
            <Box flexGrow={1} />
            {user === null ? <LoginButton /> : <AvatarMenu />}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
