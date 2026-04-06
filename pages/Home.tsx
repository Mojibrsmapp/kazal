import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import CampaignBanner from '../components/CampaignBanner';
import Biography from '../components/Biography';
import Timeline from '../components/Timeline';
import Vision from '../components/Vision';
import Responsibilities from '../components/Responsibilities';
import Support from '../components/Support';
import Constituency from '../components/Constituency';
import Achievements from '../components/Achievements';
import ElectionStats from '../components/ElectionStats';
import MediaGallery from '../components/MediaGallery';
import Documents from '../components/Documents';
import News from '../components/News';
import Events from '../components/Events';
import Message from '../components/Message';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import VoterSearch from '../components/VoterSearch';
import { COMMON_KEYWORDS } from '../constants';

const Home: React.FC = () => (
  <>
    <SEO 
      title="Lutfur Rahman Kajal | লুৎফুর রহমান কাজল | MP Cox's Bazar-3 Official Website" 
      description="Official website of Lutfur Rahman Kajal, Member of Parliament (Cox's Bazar-3) and BNP Central Fisheries Affairs Secretary. Explore his biography, vision, development works, and latest news from Cox's Bazar Sadar, Ramu, and Eidgaon."
      keywords={[...COMMON_KEYWORDS, "Lutfur Rahman Kajal Website", "Political Portfolio", "কাজলের জীবনী", "BNP Leader Cox's Bazar"]}
    />
    <Hero />
    <CampaignBanner />
    <Biography />
    <Timeline />
    <Vision />
    <Responsibilities />
    <Support />
    <Constituency />
    <Achievements />
    <ElectionStats />
    <MediaGallery />
    <Documents />
    <News />
    <Events />
    <Message />
    <Contact />
    <FAQ />
    <VoterSearch />
  </>
);

export default Home;
