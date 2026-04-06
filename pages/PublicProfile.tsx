import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'motion/react';
import { User, Calendar, Newspaper, ArrowLeft, Loader2, Mail, Phone } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SEO from '../components/SEO';

const PublicProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/public/admin/${slug}`);
        setProfile(response.data);
      } catch (err) {
        console.error('Failed to fetch public profile', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">প্রোফাইল পাওয়া যায়নি</h1>
          <p className="text-slate-600 mb-8">দুঃখিত, আপনি যে প্রোফাইলটি খুঁজছেন তা খুঁজে পাওয়া যায়নি।</p>
          <Link to="/" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <SEO 
        title={`${profile.admin.full_name} - লুৎফুর রহমান কাজল`}
        description={`${profile.admin.full_name} এর প্রকাশিত সকল সংবাদ ও আপডেট।`}
        image={profile.admin.avatar}
        canonical={`http://kazal.pro.bd/${profile.admin.slug}`}
      />

      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-white border-b border-slate-200 pt-12 pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <Link to="/news" className="inline-flex items-center text-primary font-bold mb-8 hover:underline">
              <ArrowLeft size={18} className="mr-2" /> সব খবর
            </Link>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-slate-100 overflow-hidden border-4 border-white shadow-xl"
              >
                {profile.admin.avatar ? (
                  <img src={profile.admin.avatar} alt={profile.admin.full_name} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-slate-300 m-auto mt-10 md:mt-16" />
                )}
              </motion.div>

              <div className="text-center md:text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-5xl font-black text-slate-900 mb-4"
                >
                  {profile.admin.full_name}
                </motion.h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Newspaper size={18} className="text-primary" />
                    <span>{profile.news.length} টি সংবাদ প্রকাশিত</span>
                  </div>
                  {profile.admin.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-primary" />
                      <span>{profile.admin.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News List Section */}
        <div className="max-w-7xl mx-auto px-4 -mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.news.map((news: any, index: number) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all"
              >
                <Link to={`/${news.slug}`}>
                  <div className="h-56 bg-slate-100 relative overflow-hidden">
                    {news.image_url ? (
                      <img src={news.image_url} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Newspaper size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <Calendar size={12} className="text-primary" />
                      {new Date(news.created_at).toLocaleDateString('bn-BD')}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors bengali-text">
                      {news.title}
                    </h3>
                    <div className="flex items-center text-primary font-bold text-sm">
                      বিস্তারিত পড়ুন <ArrowLeft size={16} className="ml-2 rotate-180" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {profile.news.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
              <Newspaper size={64} className="text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">কোন সংবাদ পাওয়া যায়নি</h3>
              <p className="text-slate-500">এই লেখকের এখনও কোন সংবাদ প্রকাশিত হয়নি।</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default PublicProfile;
