import React from 'react';
import { Link as MUILink, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import './Footer.css';

interface SocialMedia {
  platform: string;
  url: string;
}

interface FooterProps {
  socialMedia: SocialMedia[];
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({ socialMedia, copyright }) => {
  return (
    <footer className="footer">
      <div className="footer-items">
        <div className="social-links">
          {socialMedia.map((social) => (
            <MUILink
              key={social.platform}
              href={social.url}
              aria-label={social.platform}
              target="_blank"
              rel="noopener noreferrer">
              {social.platform === 'facebook' && <Facebook />}
              {social.platform === 'twitter' && <Twitter />}
              {social.platform === 'instagram' && <Instagram />}
              {social.platform === 'youtube' && <YouTube />}
            </MUILink>
          ))}
        </div>
        <div className="footer-links">
          <Typography variant="body2">{copyright}</Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
