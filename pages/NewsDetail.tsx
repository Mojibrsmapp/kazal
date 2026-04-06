import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Share2, ExternalLink, Loader2, Tag, FolderOpen } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`/api/news/${slug}`);
        setNews(response.data);
      } catch (err) {
        console.error('Failed to fetch news detail', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsDetail();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error || !news) {
    // If it's not a news slug, it might be a 404 or a different route
    // But since this is a catch-all for /:slug, we should be careful
    return <Navigate to="/" replace />;
  }

  // If it's an external link only news, redirect to it
  if (news.external_link && !news.content) {
    window.location.href = news.external_link;
    return null;
  }

  return (
    <PageWrapper>
      <SEO 
        title={`${news.title} - লুৎফুর রহমান কাজল`}
        description={news.meta_description || news.content?.substring(0, 160) || news.title}
        image={news.image_url}
        canonical={`http://kazal.pro.bd/${news.slug}`}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link 
            to="/news" 
            className="inline-flex items-center text-primary hover:text-primary-light font-bold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            সব খবর
          </Link>

          <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            {news.image_url && (
              <div className="relative h-[300px] md:h-[500px] w-full">
                <img 
                  src={news.image_url} 
                  alt={news.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-primary" />
                  {new Date(news.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                {news.author_name && (
                  <Link to={`/${news.author_slug}`} className="flex items-center gap-2 group/author">
                    <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      {news.author_avatar ? (
                        <img src={news.author_avatar} alt={news.author_name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={12} className="text-slate-400 m-auto" />
                      )}
                    </div>
                    <span className="font-bold text-slate-700 group-hover/author:text-primary transition-colors">
                      {news.author_name}
                    </span>
                  </Link>
                )}
                {news.category && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-bold text-xs">
                    <FolderOpen size={12} />
                    {news.category}
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight mb-8 bengali-text">
                {news.title}
              </h1>

              <div className="prose prose-lg prose-slate max-w-none mb-12">
                <div className="text-slate-700 leading-loose space-y-6 text-lg bengali-text quill-content">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {news.content}
                  </ReactMarkdown>
                </div>
              </div>

              {news.tags && (
                <div className="flex flex-wrap gap-2 mb-12">
                  {news.tags.split(',').map((tag: string, i: number) => (
                    <span key={i} className="flex items-center gap-1 px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-lg">
                      <Tag size={12} />
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {news.external_link && (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-800 mb-1">মূল সংবাদটি পড়তে ভিজিট করুন</p>
                    <p className="text-sm text-slate-500">{new URL(news.external_link).hostname}</p>
                  </div>
                  <a 
                    href={news.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
                  >
                    বিস্তারিত পড়ুন <ExternalLink size={18} />
                  </a>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: news.title,
                        url: window.location.href
                      });
                    }
                  }}
                  className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold"
                >
                  <Share2 size={20} /> শেয়ার করুন
                </button>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default NewsDetail;
