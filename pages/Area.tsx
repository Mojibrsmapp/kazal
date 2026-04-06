import React from 'react';
import SEO from '../components/SEO';
import Constituency from '../components/Constituency';
import Achievements from '../components/Achievements';
import ElectionStats from '../components/ElectionStats';
import PageWrapper from '../components/PageWrapper';
import { COMMON_KEYWORDS } from '../constants';

const Area: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Constituency Cox's Bazar-3 | নির্বাচনী এলাকা | Lutfur Rahman Kajal - Sadar, Ramu, Eidgaon" 
      description="Information about Cox's Bazar-3 constituency including Cox's Bazar Sadar, Ramu, and Eidgaon. View development statistics, election history, and local achievements. কক্সবাজার সদর, রামু ও ঈদগাঁও উপজেলার উন্নয়ন ও নির্বাচনী তথ্য।" 
      keywords={[...COMMON_KEYWORDS, "Cox's Bazar Sadar", "Ramu Upazila", "Eidgaon Upazila", "Election Result", "Constituency 299"]}
    />
    <Constituency />
    <Achievements />
    <ElectionStats />
  </PageWrapper>
);

export default Area;
