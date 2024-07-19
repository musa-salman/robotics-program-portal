import React from 'react';
import { AppBar, Toolbar, Container, Box, Avatar } from '@mui/material';
import AvatarMenu from './AvatarMenu';
import './Header.css';
import LoginButton from '../../authentication/components/Login/Login';
import { useAuth } from '../../authentication/services/useAuth';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface HeaderProps {
  logo: string;
  links: { name: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ logo, links }) => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <header>
      <Box
        className="boxBar"
        position="static"
        sx={{
          boxShadow: `0px 2px 7px 0px ${theme.palette.primary.main}`
        }}>
        <Container>
          <Toolbar>
            <Avatar alt="Logo" src="/logo.jpg" sx={{ width: 40, height: 40 }} />
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
      </Box>
    </header>
  );
};

export default Header;
