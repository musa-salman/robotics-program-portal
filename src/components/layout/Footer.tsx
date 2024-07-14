import React from 'react';
import { Container, Grid, Link, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import './Footer.css';

interface Link {
  name: string;
  path: string;
}

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
            <Link key={social.platform} href={social.url} style={{ marginLeft: '15px' }}>
              {social.platform === 'facebook' && <Facebook style={{ color: 'white' }} />}
              {social.platform === 'twitter' && <Twitter style={{ color: 'white' }} />}
              {social.platform === 'instagram' && <Instagram style={{ color: 'white' }} />}
              {social.platform === 'youtube' && <YouTube style={{ color: 'white' }} />}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <Typography variant="body2" style={{ marginTop: '10px', color: 'white' }}>
            {copyright}
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
