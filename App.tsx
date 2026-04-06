import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CampaignBanner from './components/CampaignBanner';
import Biography from './components/Biography';
import Timeline from './components/Timeline';
import Responsibilities from './components/Responsibilities';
import Constituency from './components/Constituency';
import Achievements from './components/Achievements';
import ElectionStats from './components/ElectionStats';
import MediaGallery from './components/MediaGallery';
import News from './components/News';
import Documents from './components/Documents';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Vision from './components/Vision';
import Support from './components/Support';
import Events from './components/Events';
import FAQ from './components/FAQ';
import Message from './components/Message';
import SEO from './components/SEO';
import VoterSearch from './components/VoterSearch';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Internal Page Wrapper for consistent spacing
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="pt-32 md:pt-40 min-h-screen bg-gray-50">
    {children}
  </div>
);

// Common keywords for the entire site
const COMMON_KEYWORDS = [
  "Lutfur Rahman Kajal", "লুৎফুর রহমান কাজল", 
  "Kajal MP", "কাজল এমপি", 
  "Cox's Bazar-3", "কক্সবাজার-৩", 
  "BNP Cox's Bazar", "বিএনপি কক্সবাজার", 
  "MP Bangladesh", "সংসদ সদস্য",
  "Ramu", "রামু", "Eidgaon", "ঈদগাঁও",
  "Bangladesh Nationalist Party", "বাংলাদেশ জাতীয়তাবাদী দল",
  "Niribili Group", "নিরিবিলি গ্রুপ",
  "lutfur rahman kajal news", "lutfur rahman kajal biography",
  "লুৎফুর রহমান কাজল খবর", "লুৎফুর রহমান কাজল জীবনী",
  "kajal lutfur rahman", "kajal politician bangladesh",
  "lutfur rahman kajal latest news", "lutfur rahman kajal update 2026",
  "kajal bangladesh politics news", "kajal statement today",
  "kajal speech news", "লুৎফুর রহমান কাজল সর্বশেষ খবর",
  "কাজল আজকের খবর", "কাজল রাজনৈতিক আপডেট",
  "কাজল বক্তব্য আজ", "lutfur rahman kajal who is he",
  "lutfur rahman kajal political career", "kajal bangladesh leader profile",
  "kajal controversy news", "kajal interview bangla",
  "লুৎফুর রহমান কাজল কে", "কাজল কোন দলের",
  "কাজল এর রাজনৈতিক জীবন", "কাজল সম্পর্কে বিস্তারিত",
  "kajal news today", "kajal viral news",
  "kajal facebook post", "kajal latest update",
  "kajal video speech", "কাজল ভাইরাল খবর",
  "কাজল ফেসবুক পোস্ট", "কাজল ভিডিও",
  "kajal news website", "lutfur rahman kajal official",
  "kajal news portal", "kajal blog bangla",
  "kajal media", "কাজল নিউজ ওয়েবসাইট",
  "কাজল অফিসিয়াল সাইট", "coxs bazar", "mp",
  "kajal news", "kajal bangladesh", "kajal politics", "কাজল খবর", "কাজল আপডেট", "kajal biography", "kajal speech", "kajal update", "kajal latest news",
  "coxs bazar 3 mp", "coxs bazar 3 mp kajal", "lutfur rahman kajal coxs bazar 3", "kajal mp coxs bazar",
  "coxs bazar 03 mp news", "coxs bazar 3 mp latest news", "kajal coxs bazar politics", "kajal mp news today",
  "coxs bazar 3 election mp", "kajal election news", "লুৎফুর রহমান কাজল কক্সবাজার ৩", "কক্সবাজার ৩ আসনের এমপি কাজল",
  "কাজল এমপি কক্সবাজার", "কক্সবাজার ০৩ এমপি খবর", "কাজল কক্সবাজার রাজনীতি", "কাজল এমপি আপডেট",
  "কাজল নির্বাচনী খবর", "কাজল বক্তব্য কক্সবাজার", "কাজল রাজনৈতিক নেতা", "কক্সবাজার ৩ আসনের খবর",
  "kajal coxs bazar mp profile", "lutfur rahman kajal mp profile", "kajal mp biography coxs bazar",
  "kajal mp political career", "kajal mp bangladesh", "kajal leader coxs bazar", "kajal mp speech",
  "kajal mp interview", "kajal mp video", "kajal mp facebook", "কক্সবাজার ৩ আসনের রাজনীতি",
  "কক্সবাজার এমপি কাজল", "কাজল জীবনী কক্সবাজার", "কাজল রাজনৈতিক জীবন", "কাজল এমপি প্রোফাইল",
  "কাজল এমপি বক্তব্য", "কাজল সাক্ষাৎকার", "কাজল ভিডিও", "কাজল ফেসবুক পোস্ট", "কাজল লাইভ",
  "kajal coxs bazar update", "kajal coxs bazar latest news", "kajal coxs bazar today", "kajal coxs bazar speech today",
  "kajal coxs bazar viral news", "kajal coxs bazar controversy", "kajal coxs bazar election result",
  "kajal coxs bazar vote news", "kajal coxs bazar development", "kajal coxs bazar project", "কাজল কক্সবাজার আপডেট",
  "কাজল কক্সবাজার সর্বশেষ খবর", "কাজল কক্সবাজার আজকের খবর", "কাজল কক্সবাজার বক্তব্য আজ", "কাজল ভাইরাল খবর",
  "কাজল বিতর্ক", "কাজল নির্বাচনের ফলাফল", "কাজল ভোটের খবর", "কাজল উন্নয়ন কাজ", "কাজল প্রকল্প",
  "coxs bazar 3 seat mp kajal", "coxs bazar constituency 3 kajal", "kajal mp constituency coxs bazar",
  "kajal mp seat 3 bangladesh", "kajal mp district coxs bazar", "kajal mp region coxs bazar",
  "kajal mp local news", "kajal mp area update", "kajal mp development news", "kajal mp local politics",
  "কক্সবাজার ৩ আসন কাজল", "কক্সবাজার আসন ৩ এমপি", "কাজল আসন কক্সবাজার", "কাজল এমপি এলাকা",
  "কাজল এমপি জেলা কক্সবাজার", "কাজল স্থানীয় খবর", "কাজল এলাকা আপডেট", "কাজল উন্নয়ন সংবাদ",
  "কাজল স্থানীয় রাজনীতি", "কাজল জনগণের নেতা", "kajal news coxs bazar", "kajal update bangladesh",
  "kajal politics bangladesh", "kajal leader news", "kajal public meeting", "kajal rally news",
  "kajal protest news", "kajal campaign news", "kajal supporter news", "kajal team news",
  "কাজল সংবাদ কক্সবাজার", "কাজল আপডেট বাংলাদেশ", "কাজল রাজনীতি বাংলাদেশ", "কাজল নেতা খবর",
  "কাজল জনসভা", "কাজল মিছিল", "কাজল প্রতিবাদ", "কাজল প্রচারণা", "কাজল সমর্থক", "কাজল দলীয় খবর"
];

// HomePage now includes ALL sections to provide the "full page" experience on the root URL
const HomePage: React.FC = () => (
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

const BiographyPage: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Biography | জীবনী | Lutfur Rahman Kajal - Political Journey" 
      description="Detailed political and personal biography of Lutfur Rahman Kajal. From student politics to Member of Parliament for Cox's Bazar-3. Learn about his career milestones and contributions. লুৎফুর রহমান কাজলের রাজনৈতিক ও ব্যক্তিগত জীবনী।"
      keywords={[...COMMON_KEYWORDS, "Kajal Biography", "Political Career", "কাজলের রাজনৈতিক জীবন", "Kajal MP Profile"]} 
    />
    <Biography />
    <Timeline />
  </PageWrapper>
);

const VisionPage: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Vision & Development | ভিশন | Lutfur Rahman Kajal - Future Cox's Bazar" 
      description="Explore the vision and development plans for Cox's Bazar-3 by Lutfur Rahman Kajal. Focus on Education, Tourism, Infrastructure, and Youth Employment. কক্সবাজারের উন্নয়নে লুৎফুর রহমান কাজলের ভিশন ও উন্নয়ন পরিকল্পনা।" 
      keywords={[...COMMON_KEYWORDS, "Development Plan", "Cox's Bazar University", "Tourism Development", "উন্নয়ন ভাবনা", "Kajal Vision 2026"]}
    />
    <Vision />
    <Responsibilities />
    <Support />
  </PageWrapper>
);

const AreaPage: React.FC = () => (
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

const MediaPage: React.FC = () => (
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

const NewsPage: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="News & Updates | সংবাদ ও আপডেট | Lutfur Rahman Kajal" 
      description="Latest news, press releases, interviews, and official statements of Lutfur Rahman Kajal. Stay updated with BNP activities in Cox's Bazar. লুৎফুর রহমান কাজলের সর্বশেষ সংবাদ এবং দলীয় কর্মসূচির আপডেট।" 
      keywords={[...COMMON_KEYWORDS, "Latest News", "Political News", "BNP News Cox's Bazar", "প্রেস বিজ্ঞপ্তি", "Kajal News Today"]}
    />
    <News />
    <Events />
  </PageWrapper>
);

const ContactPage: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Contact | যোগাযোগ | Lutfur Rahman Kajal - Office & Volunteer" 
      description="Get in touch with Lutfur Rahman Kajal. Find office addresses in Dhaka and Cox's Bazar, phone numbers, and email. Join our volunteer team. সরাসরি যোগাযোগ করুন অথবা ভলান্টিয়ার হিসেবে যুক্ত হোন।" 
      keywords={[...COMMON_KEYWORDS, "Contact Number", "Dhaka Office", "Cox's Bazar Office", "Join BNP", "Kajal Volunteer"]}
    />
    <Contact />
    <FAQ />
  </PageWrapper>
);

const VoterSlipPage: React.FC = () => (
  <PageWrapper>
    <SEO 
      title="Voter Slip Download | ভোটার স্লিপ ডাউনলোড | Lutfur Rahman Kajal - Cox's Bazar-3 Election 2026" 
      description="Search and download your voter slip for Cox's Bazar-3 (Sadar, Ramu, Eidgaon). Official voter information service by Lutfur Rahman Kajal. আপনার ভোটার স্লিপ খুঁজুন এবং ডাউনলোড করুন।" 
      keywords={[...COMMON_KEYWORDS, "Voter Slip", "Voter Search", "Election 2026", "ভোটার স্লিপ", "Kajal Voter Slip"]}
    />
    <VoterSearch />
  </PageWrapper>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/biography" element={<BiographyPage />} />
              <Route path="/vision" element={<VisionPage />} />
              <Route path="/area" element={<AreaPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/voter-slip" element={<VoterSlipPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Catch all - redirect to home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </HelmetProvider>
  );
};

export default App;