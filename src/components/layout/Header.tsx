import React from 'react';
import { Toolbar, Container, Box, Avatar } from '@mui/material';
import AvatarMenu from './AvatarMenu';
import './Header.css';
import LoginButton from '../../authentication/components/Login/Login';
import { useAuth } from '../../authentication/services/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface HeaderProps {
  links: { name: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigator = useNavigate();

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
            <Avatar
              className="logo"
              alt="Logo"
              src="/logo.jpg"
              sx={{ width: 40, height: 40 }}
              onClick={() => navigator('/')}
            />
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
