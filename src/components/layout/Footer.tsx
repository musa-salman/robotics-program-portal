import React from 'react';
import { Link, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import './Footer.css';

/**
 * Footer component.
 *
 * @component
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
const Footer: React.FC = () => {
  const socialMedia = [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/teamstreak7067/'
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/teamstreak7067/'
    }
  ];
  return (
    <footer className="footer">
      <div className="footer-items">
        <div className="social-links">
          {socialMedia.map((social) => (
            <Link key={social.platform} href={social.url} style={{ marginLeft: '15px' }}>
              {social.platform === 'facebook' && <Facebook style={{ color: 'white' }} />}
              {social.platform === 'twitter' && <Twitter style={{ color: 'white' }} />}
              {social.platform === 'instagram' && <Instagram style={{ color: 'white' }} />}
              {social.platform === 'youtube' && <YouTube style={{ color: 'white' }} />}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <Typography
            variant="body2"
            style={{ marginTop: '10px', color: 'white', display: 'flex', alignItems: 'center' }}>
            {`© ${new Date().getFullYear()} המגמה העל איזורית ברובוטיקה מכטרוניקה`}
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
