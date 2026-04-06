import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Import Pages
import Home from './pages/Home';
import Biography from './pages/Biography';
import BiographyDetail from './pages/BiographyDetail';
import Vision from './pages/Vision';
import Area from './pages/Area';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import VoterSlip from './pages/VoterSlip';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminNews from './pages/admin/NewsManagement';
import AdminUsers from './pages/admin/AdminManagement';
import AdminLogs from './pages/admin/Logs';
import AdminProfile from './pages/admin/Profile';
import AdminGallery from './pages/admin/GalleryManagement';
import AdminPlans from './pages/admin/DevelopmentPlans';
import AdminMessages from './pages/admin/Messages';
import AdminSettings from './pages/admin/AdminSettings';
import AdminNotices from './pages/admin/AdminNotices';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AddNews from './pages/admin/AddNews';
import AddGallery from './pages/admin/AddGallery';
import AddAdmin from './pages/admin/AddAdmin';

// Dynamic News Detail
import NewsDetail from './pages/NewsDetail';
import PublicProfile from './pages/PublicProfile';
import SlugHandler from './pages/SlugHandler';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NoticeBanner: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('/api/notices');
      setNotices(response.data);
    } catch (err) {
      console.error('Failed to fetch notices', err);
    }
  };

  if (notices.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] md:left-auto md:right-8 md:bottom-8 md:w-96">
      <AnimatePresence mode="wait">
        <motion.div 
          key={notices[currentIdx].id}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={cn(
            "p-6 rounded-3xl shadow-2xl border flex flex-col gap-3 relative overflow-hidden",
            notices[currentIdx].type === 'alert' 
              ? "bg-red-600 border-red-500 text-white" 
              : "bg-white border-slate-100 text-slate-800"
          )}
        >
          {notices[currentIdx].type === 'alert' && (
            <div className="absolute top-0 right-0 p-2 bg-red-700 text-white/50">
              <AlertTriangle size={48} className="opacity-10 -rotate-12" />
            </div>
          )}
          
          <div className="flex justify-between items-start">
            <h4 className="font-black uppercase tracking-wider text-xs opacity-60">
              {notices[currentIdx].type === 'alert' ? 'Urgent Alert' : 'Notice'}
            </h4>
            <button 
              onClick={() => setNotices(prev => prev.filter((_, i) => i !== currentIdx))}
              className="p-1 hover:bg-black/10 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-1">{notices[currentIdx].title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{notices[currentIdx].content}</p>
          </div>

          {notices.length > 1 && (
            <div className="flex gap-1 mt-2">
              {notices.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i === currentIdx ? "w-4 bg-current" : "w-1 bg-current/20"
                  )} 
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

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
          {!isAdminRoute && <Navbar />}
          {!isAdminRoute && <NoticeBanner />}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/biography" element={<Biography />} />
              <Route path="/biography/:slug" element={<BiographyDetail />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/area" element={<Area />} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/voter-slip" element={<VoterSlip />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/logs" element={<AdminLogs />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
              <Route path="/admin/plans" element={<AdminPlans />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/notices" element={<AdminNotices />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/news/add" element={<AddNews />} />
              <Route path="/admin/gallery/add" element={<AddGallery />} />
              <Route path="/admin/users/add" element={<AddAdmin />} />

              {/* Dynamic News Detail - Catch all for slugs */}
              <Route path="/:slug" element={<SlugHandler />} />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          {!isAdminRoute && <Footer />}
        </div>
    </HelmetProvider>
  );
};

export default App;
