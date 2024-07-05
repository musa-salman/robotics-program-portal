import React from 'react';
import { Grid } from '@mui/material';
import BannerButton from './BannerButton';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './Banner.css';

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
    <div className="banner">
      <Grid container spacing={2} justifyContent="center">
        {USER_LINKS.map((link, index) => (
          <Grid item key={index}>
            <BannerButton icon={link.icon} label={link.label} path={link.path} />
          </Grid>
        ))}
        {
          // TODO: Add role based access control
          ADMIN_LINKS.map((link, index) => (
            <Grid item key={index}>
              <BannerButton icon={link.icon} label={link.label} path={link.path} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
};

export default Banner;
