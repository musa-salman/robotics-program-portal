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
  links: Link[];
  socialMedia: SocialMedia[];
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({ links, socialMedia, copyright }) => {
  return (
    <footer className="footer">
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <ul>
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} style={{ color: 'white', textDecoration: 'none' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item md={6} sx={{ textAlign: 'right' }}>
            <div className="social-links">
              {socialMedia.map((social) => (
                <Link key={social.platform} href={social.url}>
                  {social.platform === 'facebook' && <Facebook />}
                  {social.platform === 'twitter' && <Twitter />}
                  {social.platform === 'instagram' && <Instagram />}
                  {social.platform === 'youtube' && <YouTube />}
                </Link>
              ))}
            </div>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              {copyright}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
