import React from 'react';
import SEO from '../components/SEO';
import BiographyComponent from '../components/Biography';
import Timeline from '../components/Timeline';
import PageWrapper from '../components/PageWrapper';
import { COMMON_KEYWORDS } from '../constants';

const Biography: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Biography | জীবনী | Lutfur Rahman Kajal - Political Journey" 
      description="Detailed political and personal biography of Lutfur Rahman Kajal. From student politics to Member of Parliament for Cox's Bazar-3. Learn about his career milestones and contributions. লুৎফুর রহমান কাজলের রাজনৈতিক ও ব্যক্তিগত জীবনী।"
      keywords={[...COMMON_KEYWORDS, "Kajal Biography", "Political Career", "কাজলের রাজনৈতিক জীবন", "Kajal MP Profile"]} 
    />
    <BiographyComponent />
    <Timeline />
  </PageWrapper>
);

export default Biography;
