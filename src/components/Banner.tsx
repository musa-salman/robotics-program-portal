import React from 'react';

import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './Banner.css';
import EventContainer from '../events/EventContainer';
import BannerButton from './BannerButton';

const PRIMARY_STUDENT_LINKS = [
  { icon: <BookIcon />, label: 'חומרי לימוד', path: '/study-materials' },
  { icon: <EventIcon />, label: 'אירועים', path: '/events' }
];

const PRIMARY_ADMIN_LINKS = [{ icon: <PeopleIcon />, label: 'ניהול תלמידים', path: '/students-management' }];

const STUDENT_LINKS = [{ icon: <PictureAsPdfIcon />, label: 'מסמכים', path: '/documents' }];

const ADMIN_LINKS = [
  { icon: <PeopleIcon />, label: 'ניהול משתמשים', path: '/users' },
  { icon: <PeopleIcon />, label: 'ניהול נרשמים', path: '/registers-management' }
];

const Banner: React.FC = () => {
  return (
    <>
      <div className="banner">
        <div className="primary-button-group">
          {PRIMARY_STUDENT_LINKS.map((link, index) => (
            <BannerButton
              key={index}
              icon={link.icon}
              label={link.label}
              type="primary"
              path={link.path}
              className={'primary-btn'}
            />
          ))}

          {PRIMARY_ADMIN_LINKS.map((link, index) => (
            <BannerButton
              key={index}
              icon={link.icon}
              label={link.label}
              type="primary"
              path={link.path}
              className={'primary-btn'}
            />
          ))}
        </div>
        <div className="button-group">
          {STUDENT_LINKS.map((link, index) => (
            <BannerButton
              key={index}
              icon={link.icon}
              label={link.label}
              type="secondary"
              path={link.path}
              className={'std-btn'}
            />
          ))}
          {ADMIN_LINKS.map((link, index) => (
            <BannerButton
              key={index}
              icon={link.icon}
              label={link.label}
              type="secondary"
              path={link.path}
              className={'std-btn'}
            />
          ))}
        </div>
        <div className="event">
          <EventContainer />
        </div>
      </div>
    </>
  );
};

export default Banner;
