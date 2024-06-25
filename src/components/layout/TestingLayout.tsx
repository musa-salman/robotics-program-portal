import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './TestingLayout.css';

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
    { name: 'No Internet', path: '/unconnected-internet' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="testing-layout">
      <h1>This is a Testing Layout</h1>
      <nav>
        {links.map((link) => (
          <Link key={link.name} to={link.path}>
            {link.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
};

export default TestingLayout;
