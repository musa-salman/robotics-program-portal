// import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const headerLinks = [
    { name: 'בית', path: '/' },
    { name: 'אודות', path: '/about' },
    { name: 'צור קשר', path: '/contact' }
  ];

  const footerLinks = [
    { name: 'מדיניות פרטיות', path: '/privacy' },
    { name: 'תנאי השירות', path: '/terms' }
  ];

  const socialMedia = [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/people/PICO-Kids-%D7%A4%D7%99%D7%A7%D7%95-%D7%A7%D7%99%D7%93%D7%A1/100063724223613/'
    },
    { platform: 'instagram', url: 'https://www.instagram.com/pico_mkrspce/' },
    { platform: 'youtube', url: 'https://www.youtube.com/channel/UCjQ7fK8eW4qJN8J2Qw1zvXw' }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      {/* <Header logo="/pico_logo.png" links={headerLinks} /> */}
      <main className="flex-grow-1 w-100">
        <Outlet />
      </main>
      <Footer links={footerLinks} socialMedia={socialMedia} copyright="© 2024 פיקו קידס" />
    </div>
  );
};

export default Layout;
