import React from 'react';
import SEO from '../components/SEO';
import NewsComponent from '../components/News';
import Events from '../components/Events';
import PageWrapper from '../components/PageWrapper';
import { COMMON_KEYWORDS } from '../constants';

const News: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="News & Updates | সংবাদ ও আপডেট | Lutfur Rahman Kajal" 
      description="Latest news, press releases, interviews, and official statements of Lutfur Rahman Kajal. Stay updated with BNP activities in Cox's Bazar. লুৎফুর রহমান কাজলের সর্বশেষ সংবাদ এবং দলীয় কর্মসূচির আপডেট।" 
      keywords={[...COMMON_KEYWORDS, "Latest News", "Political News", "BNP News Cox's Bazar", "প্রেস বিজ্ঞপ্তি", "Kajal News Today"]}
    />
    <NewsComponent />
    <Events />
  </PageWrapper>
);

export default News;
