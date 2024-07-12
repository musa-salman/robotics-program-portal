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
      <Container style={{ backgroundColor: 'background.paper' }}>
        <Grid
          container
          justifyContent="normal"
          alignItems="center"
          className="footer-grid"
          style={{ backgroundColor: 'background.paper' }}>
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
          <Typography variant="body2" style={{ marginTop: '10px', color: 'white' }}>
            {copyright}
          </Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
