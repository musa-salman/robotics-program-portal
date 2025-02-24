import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Represents the layout component.
 *
 * @returns The rendered layout component.
 */
const Layout = () => {
  const headerLinks = [
    { name: 'בית', path: '/' },
    { name: 'אירועים', path: '/events' },
    { name: 'חומרי למידה', path: '/study-materials' }
  ].filter((link) => link !== undefined);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}>
        <Header links={headerLinks} />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto'
          }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
