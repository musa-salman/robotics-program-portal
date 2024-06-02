import Header from './Header';
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
    { platform: 'facebook', url: 'https://www.facebook.com' },
    { platform: 'twitter', url: 'https://www.twitter.com' },
    { platform: 'instagram', url: 'https://www.instagram.com' },
    { platform: 'linkedin', url: 'https://www.linkedin.com' }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <Header logo="/vite.svg" links={headerLinks} />
      <main className="flex-grow-1 w-100">
        <Outlet />
      </main>
      <Footer links={footerLinks} socialMedia={socialMedia} copyright="© 2024 פיקו קידס" />
    </div>
  );
};

export default Layout;
