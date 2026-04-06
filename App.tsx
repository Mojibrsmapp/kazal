import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import Biography from './pages/Biography';
import Vision from './pages/Vision';
import Area from './pages/Area';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import VoterSlip from './pages/VoterSlip';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Lutfur Rahman Kajal",
        "alternateName": ["লুৎফুর রহমান কাজল", "Kajal MP", "কাজল এমপি"],
        "url": "http://kazal.pro.bd/",
        "image": "http://kazal.pro.bd/profile.jpg",
        "jobTitle": "Member of Parliament",
        "worksFor": {
          "@type": "Organization",
          "name": "Bangladesh Nationalist Party"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Cox's Bazar-3",
          "addressRegion": "Cox's Bazar",
          "addressCountry": "Bangladesh"
        },
        "knowsAbout": [
          "Politics", "Bangladesh politics", "Cox's Bazar politics",
          "Election", "Political career", "Public speech"
        ],
        "sameAs": [
          "http://kazal.pro.bd/"
        ]
      },
      {
        "@type": "WebSite",
        "name": "Kazal Official Website",
        "url": "http://kazal.pro.bd/",
        "publisher": {
          "@type": "Person",
          "name": "Mojib Rsm",
          "url": "https://www.mojib.me"
        },
        "inLanguage": "bn-BD"
      },
      {
        "@type": "Organization",
        "name": "Kazal Media",
        "url": "http://kazal.pro.bd/",
        "founder": {
          "@type": "Person",
          "name": "Mojib Rsm",
          "url": "https://www.mojib.me"
        }
      }
    ]
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>Lutfur Rahman Kajal | লুৎফুর রহমান কাজল | Cox's Bazar-3 MP Official Website</title>
          <meta name="description" content="Lutfur Rahman Kajal (লুৎফুর রহমান কাজল) Cox's Bazar-3 MP এর জীবনী, রাজনৈতিক ক্যারিয়ার, নির্বাচন ইতিহাস, সর্বশেষ খবর, বক্তব্য ও আপডেট।" />
          <meta name="google-site-verification" content="7bEm-ae1S5qDih74Q2jk8Exm0YVb1PGhaqxEW86M05E" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="canonical" href="http://kazal.pro.bd/" />
          <meta name="keywords" content="Lutfur Rahman Kajal, লুৎফুর রহমান কাজল, Kajal MP, কাজল এমপি, Cox's Bazar-3, কক্সবাজার-৩, BNP Cox's Bazar, বাংলাদেশ জাতীয়তাবাদী দল, Niribili Group, kajal news, kajal biography, kajal politics, kajal update, kajal speech, kajal mp coxs bazar, kajal election news, kajal latest news, kajal bangladesh politics, kajal mp profile, kajal coxs bazar update, kajal leader, kajal public meeting, kajal rally, kajal campaign, kajal news coxs bazar, kajal update bangladesh, kajal politics bangladesh, kajal leader news, kajal public meeting, kajal rally news, kajal protest news, kajal campaign news, kajal supporter news, kajal team news" />
          
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Lutfur Rahman Kajal Official Website" />
          <meta property="og:description" content="Biography, political timeline, election history and latest news of Kajal MP" />
          <meta property="og:url" content="http://kazal.pro.bd/" />
          <meta property="og:image" content="http://kazal.pro.bd/preview.jpg" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Lutfur Rahman Kajal" />
          <meta name="twitter:description" content="Official profile and latest updates" />
          <meta name="twitter:image" content="http://kazal.pro.bd/preview.jpg" />

          <script type="application/ld+json">
            {JSON.stringify(schemaGraph)}
          </script>
        </Helmet>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/biography" element={<Biography />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/area" element={<Area />} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/voter-slip" element={<VoterSlip />} />
              <Route path="/contact" element={<Contact />} />
              {/* Catch all - redirect to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
