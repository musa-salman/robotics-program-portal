import React from 'react';
import { AppBar, Toolbar, Container, Box, Link, Avatar } from '@mui/material';
import AvatarMenu from './AvatarMenu';
import './Header.css';
import { auth } from '../../firebase';
import LoginButton from '../../authentication/components/Login/Login';
import { useAuth } from '../../authentication/services/useAuth';

interface HeaderProps {
  logo: string;
  links: { name: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ logo, links }) => {
  const { user } = useAuth();

  return (
    <header>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <Avatar alt="Logo" src={logo} sx={{ width: 40, height: 40 }} />
            <nav className="nav-links">
              {links.map((link) => (
                <Link key={link.name} href={link.path}>
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
