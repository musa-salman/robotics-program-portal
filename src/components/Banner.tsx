import React from 'react';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './Banner.css';
import EventContainer from '../events/EventContainer';
import BannerButton from './BannerButton';
import { Insights } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import RoleBasedAccessControl from '../authentication/components/RoleBasedAccessControl';
import Role from '../authentication/components/Roles';

/**
 * Represents an array of primary student links.
 * Each link object contains an icon, label, and path.
 */
const PRIMARY_STUDENT_LINKS = [
  { icon: <BookIcon />, label: 'חומרי למידה', path: '/study-materials' },
  { icon: <EventIcon />, label: 'אירועים', path: '/events' }
];

/**
 * Represents an array of primary admin links.
 * Each link object contains an icon, label, and path.
 */
const PRIMARY_ADMIN_LINKS = [{ icon: <PeopleIcon />, label: 'ניהול משתמשים', path: '/students-management' }];

/**
 * Represents an array of student links.
 * Each link object contains an icon, label, and path.
 */
const STUDENT_LINKS = [{ icon: <PictureAsPdfIcon />, label: 'מסמכים', path: '/documents' }];

/**
 * Renders a banner component.
 *
 * @component
 * @example
 * ```tsx
 * <Banner />
 * ```
 */
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

          <RoleBasedAccessControl
            allowedRoles={[Role.Admin, Role.Owner]}
            unauthorizedAuthenticatedComponent={<></>}
            unauthorizedUnauthenticatedComponent={<></>}>
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
          </RoleBasedAccessControl>
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
            <RoleBasedAccessControl
              allowedRoles={[Role.Admin, Role.Owner]}
              unauthorizedAuthenticatedComponent={<></>}
              unauthorizedUnauthenticatedComponent={<></>}>
              <BannerButton
                icon={<Insights />}
                label="סטטיסטיקות"
                type="secondary"
                path="/deep-inspection"
                className={'std-btn'}
              />
            </RoleBasedAccessControl>
          </div>
        </div>
        <Container className="event">
          <EventContainer />
        </Container>
      </div>
    </>
  );
};

export default Banner;
