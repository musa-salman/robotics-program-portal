import React from 'react';
import { Box, Container, Grid } from '@mui/material';

import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './Banner.css';
import EventContainer from '../events/EventContainer';
import BannerButton from './BannerButton';

const USER_LINKS = [
  { icon: <BookIcon />, label: 'חומרי לימוד', path: '/study-materials' },
  { icon: <EventIcon />, label: 'אירועים', path: '/events' },
  { icon: <PictureAsPdfIcon />, label: 'מסמכים', path: '/documents' }
];

const ADMIN_LINKS = [
  { icon: <PeopleIcon />, label: 'ניהול תלמדים', path: '/students-management' },
  { icon: <PeopleIcon />, label: 'ניהול נרשמים', path: '/registers-management' },
  { icon: <PeopleIcon />, label: 'ניהול משתמשים', path: '/users' }
];

const Banner: React.FC = () => {
  return (
    <>
      <div className="banner">
        <BannerButton className="std-btn" icon={<BookIcon />} label="חומרי לימוד" path="/study-materials" />

        <div className="event">
          <EventContainer />
        </div>
        <div className="button-group">
          <BannerButton
            className="button-icon"
            icon={<PeopleIcon />}
            label="ניהול תלמדים"
            path="/students-management"
          />
          <BannerButton
            className="button-icon"
            icon={<PeopleIcon />}
            label="ניהול נרשמים"
            path="/registers-management"
          />
          <BannerButton className="button-icon" icon={<PeopleIcon />} label="ניהול משתמשים" path="/users" />
          <BannerButton className="button-icon" icon={<PictureAsPdfIcon />} label="מסמכים" path="/documents" />
        </div>
      </div>
    </>
  );
};

export default Banner;
