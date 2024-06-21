import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const TestingLayout: React.FC = () => {
  return (
    <div className="ltr">
      <h1>This is a Testing Layout</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/forget-password">Forget Password</Link>
          </li>
          <li>
            <Link to="/study-material">Study Material</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/students">Students Management</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/gpt">GPT Playground</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default TestingLayout;
