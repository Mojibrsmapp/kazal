import React from 'react';
import SEO from '../components/SEO';
import MediaGallery from '../components/MediaGallery';
import Documents from '../components/Documents';
import PageWrapper from '../components/PageWrapper';
import { COMMON_KEYWORDS } from '../constants';

const Gallery: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Media Gallery | ফটো ও ভিডিও গ্যালারি | Lutfur Rahman Kajal" 
      description="Official photo and video gallery of Lutfur Rahman Kajal. Highlights of political programs, public meetings, social work, and media appearances. লুৎফুর রহমান কাজলের রাজনৈতিক কর্মসূচির ছবি ও ভিডিও।" 
      keywords={[...COMMON_KEYWORDS, "Kajal Photos", "Political Rally", "BNP Program Photos", "জনসভার ছবি", "Kajal Videos"]}
    />
    <MediaGallery />
    <Documents />
  </PageWrapper>
);

export default Gallery;
