import { Container, Box, Divider } from '@mui/material';
import HeroSection from './HeroSection';
import Sponsors from './Sponsors';
import AboutUs from './AboutUs';
import OurMission from './OurMission';
import Achievements from './Achievements';
import Team from './Team';
import GetInvolved from './GetInvolved';
import Contact from './Contact';
import EventContainer from '../events/EventContainer';

function Home() {
  return (
    <Container maxWidth="xl">
      <HeroSection />
      <Box my={4}>
        <AboutUs />
        <Divider />
        <OurMission />
        <Divider />
        <Achievements />
        <Divider />
        <Team />
        <Divider />
        <GetInvolved />
        <Divider />
        <EventContainer />
        <Sponsors />
        <Divider />
        <Contact />
      </Box>
    </Container>
  );
}

export default Home;
