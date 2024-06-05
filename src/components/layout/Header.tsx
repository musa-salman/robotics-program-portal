import React from 'react';
import { AppBar, Toolbar, Container, Box, Link } from '@mui/material';
import AvatarMenu from './AvatarMenu';
import './Header.css';

interface HeaderProps {
  logo: string;
  links: { name: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ logo, links }) => {
  return (
    <header>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <img src={logo} height="40" alt="Logo" className="logo" />
            <nav className="nav-links">
              {links.map((link) => (
                <Link key={link.name} href={link.path}>
                  {link.name}
                </Link>
              ))}
            </nav>
            <Box flexGrow={1} />
            <AvatarMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
