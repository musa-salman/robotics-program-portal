import { Box } from '@mui/material';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  const headerLinks = [
    { name: 'בית', path: '/' },
    { name: 'אירועים', path: '/events' },
    { name: 'חומרי למידה', path: '/study-materials' },
    { name: 'נהול תלמדים', path: '/students-management' },
    { name: 'סטטיסטיקות', path: '/deep-inspection' }
  ].filter((link) => link !== undefined);

  const socialMedia = [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/teamstreak7067/'
    }
  ];

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
        <Footer socialMedia={socialMedia} copyright="© 2024 פיקו קידס" />
      </Box>
    </>
  );
};

export default Layout;
