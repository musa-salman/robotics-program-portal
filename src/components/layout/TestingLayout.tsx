import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './TestingLayout.css';

/**
 * Represents a testing layout component.
 * This component renders a navigation menu with links to different pages.
 * It also renders the content of the current page.
 */
const TestingLayout: React.FC = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Forget Password', path: '/forget-password' },
    { name: 'Register', path: '/register' },
    { name: 'Study Material', path: '/study-material' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Students Management', path: '/students' },
    { name: 'Events', path: '/events' },
    { name: 'GPT Playground', path: '/gpt' },
    { name: 'Approval Page', path: '/approvalPage' },
    { name: 'Registers Management', path: '/registers' },
    { name: 'No Internet', path: '/unconnected-internet' },
    { name: 'Unauthorized', path: '/401' },
    { name: 'Not Found', path: '*' },
    { name: 'Splash', path: '/splash' },
    { name: 'Rejection', path: '/rejection' },
    { name: 'Users Management', path: '/users' },
    { name: 'Documents', path: '/documents' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="testing-layout">
      <nav>
        <ul className="links-list">
          {links.map((link) => (
            <li key={link.name} className="link-item">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default TestingLayout;
