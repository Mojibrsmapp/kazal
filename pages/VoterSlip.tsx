import React from 'react';
import SEO from '../components/SEO';
import VoterSearch from '../components/VoterSearch';
import PageWrapper from '../components/PageWrapper';
import { COMMON_KEYWORDS } from '../constants';

const VoterSlip: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Voter Slip Download | ভোটার স্লিপ ডাউনলোড | Lutfur Rahman Kajal - Cox's Bazar-3 Election 2026" 
      description="Search and download your voter slip for Cox's Bazar-3 (Sadar, Ramu, Eidgaon). Official voter information service by Lutfur Rahman Kajal. আপনার ভোটার স্লিপ খুঁজুন এবং ডাউনলোড করুন।" 
      keywords={[...COMMON_KEYWORDS, "Voter Slip", "Voter Search", "Election 2026", "ভোটার স্লিপ", "Kajal Voter Slip"]}
    />
    <VoterSearch />
  </PageWrapper>
);

export default VoterSlip;
