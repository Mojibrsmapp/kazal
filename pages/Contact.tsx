import React from 'react';
import SEO from '../components/SEO';
import ContactComponent from '../components/Contact';
import FAQ from '../components/FAQ';
import PageWrapper from '../components/PageWrapper';
import { COMMON_KEYWORDS } from '../constants';

const Contact: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Contact | যোগাযোগ | Lutfur Rahman Kajal - Office & Volunteer" 
      description="Get in touch with Lutfur Rahman Kajal. Find office addresses in Dhaka and Cox's Bazar, phone numbers, and email. Join our volunteer team. সরাসরি যোগাযোগ করুন অথবা ভলান্টিয়ার হিসেবে যুক্ত হোন।" 
      keywords={[...COMMON_KEYWORDS, "Contact Number", "Dhaka Office", "Cox's Bazar Office", "Join BNP", "Kajal Volunteer"]}
    />
    <ContactComponent />
    <FAQ />
  </PageWrapper>
);

export default Contact;
