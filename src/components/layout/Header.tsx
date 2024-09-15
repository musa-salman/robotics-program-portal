import React from 'react';
import { Toolbar, Container, Box, Avatar } from '@mui/material';
import './Header.css';
import LoginButton from '../../authentication/components/Login/Login';
import { useAuth } from '../../authentication/services/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import LogoutButton from '../../authentication/components/Logout';
import RoleBasedAccessControl from '../../authentication/components/RoleBasedAccessControl';
import Role from '../../authentication/components/Roles';

/**
 * Represents the props for the Header component.
 */
interface HeaderProps {
  links: { name: string; path: string }[];
}

/**
 * Represents the header component of the application.
 *
 * @component
 * @example
 * ```tsx
 * <Header links={headerLinks} />
 * ```
 */
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
                <RoleBasedAccessControl
                  key={link.name}
                  allowedRoles={[Role.Admin, Role.Owner, Role.Student]}
                  unauthorizedAuthenticatedComponent={<></>}>
                  <Link key={link.name} to={link.path}>
                    {link.name}
                  </Link>
                </RoleBasedAccessControl>
              ))}
              <RoleBasedAccessControl
                allowedRoles={[Role.Admin, Role.Owner]}
                unauthorizedAuthenticatedComponent={<></>}
                unauthorizedUnauthenticatedComponent={<></>}>
                <Link to="/students-management">ניהול משתמשים</Link>
              </RoleBasedAccessControl>
              <RoleBasedAccessControl
                allowedRoles={[Role.Admin, Role.Owner]}
                unauthorizedAuthenticatedComponent={<></>}
                unauthorizedUnauthenticatedComponent={<></>}>
                <Link to="/deep-inspection">סטטיסטיקות</Link>
              </RoleBasedAccessControl>
            </nav>
            <Box flexGrow={1} />
            {user === null ? <LoginButton /> : <LogoutButton />}
          </Toolbar>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
