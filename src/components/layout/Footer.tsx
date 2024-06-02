import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

type FooterProps = {
  links: { name: string; path: string }[];
  socialMedia: { platform: string; url: string }[];
  copyright: string;
};

const Footer: React.FC<FooterProps> = ({ links, socialMedia, copyright }) => {
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FaFacebook />;
      case 'twitter':
        return <FaTwitter />;
      case 'instagram':
        return <FaInstagram />;
      case 'linkedin':
        return <FaLinkedin />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <ul className="list-unstyled">
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={6} className="text-md-right">
            <div>
              {socialMedia.map((social) => (
                <a key={social.platform} href={social.url} className="text-white ml-2 p-2">
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
            <small className="d-block mt-3">{copyright}</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
