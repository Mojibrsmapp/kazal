import React from 'react';
import SEO from '../components/SEO';
import VisionComponent from '../components/Vision';
import Responsibilities from '../components/Responsibilities';
import Support from '../components/Support';
import PageWrapper from '../components/PageWrapper';
import { COMMON_KEYWORDS } from '../constants';

const Vision: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Vision & Development | ভিশন | Lutfur Rahman Kajal - Future Cox's Bazar" 
      description="Explore the vision and development plans for Cox's Bazar-3 by Lutfur Rahman Kajal. Focus on Education, Tourism, Infrastructure, and Youth Employment. কক্সবাজারের উন্নয়নে লুৎফুর রহমান কাজলের ভিশন ও উন্নয়ন পরিকল্পনা।" 
      keywords={[...COMMON_KEYWORDS, "Development Plan", "Cox's Bazar University", "Tourism Development", "উন্নয়ন ভাবনা", "Kajal Vision 2026"]}
    />
    <VisionComponent />
    <Responsibilities />
    <Support />
  </PageWrapper>
);

export default Vision;
