
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NEWS_DATA } from '../constants';
import { Newspaper, Video, FileText, ArrowRight, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const News: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'News' | 'Interview' | 'PressNote'>('All');
  const [dbNews, setDbNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDbNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setDbNews(response.data);
      } catch (err) {
        console.error('Failed to fetch news from DB', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDbNews();
  }, []);

  // Format DB news to match the structure of static news
  const formattedDbNews = dbNews.map(item => {
    // Map Bengali categories to English types used in filter
    let type = 'News';
    if (item.category === 'সাক্ষাৎকার' || item.category === 'Interview') type = 'Interview';
    if (item.category === 'প্রেস নোট' || item.category === 'PressNote') type = 'PressNote';
    
    return {
      id: `db-${item.id}`,
      title: item.title,
      summary: item.content?.replace(/<[^>]*>/g, '').substring(0, 150) || item.title,
      date: new Date(item.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      source: item.external_link ? (new URL(item.external_link).hostname) : 'Official',
      link: item.external_link || `/${item.slug}`,
      image: item.image_url || 'https://picsum.photos/seed/news/800/600',
      type: type,
      isInternal: !item.external_link
    };
  });

  const allNews = [...formattedDbNews, ...NEWS_DATA];
  const filteredNews = filter === 'All' ? allNews : allNews.filter(item => item.type === filter);

  const filterOptions = [
    { id: 'All', label: 'সকল সংবাদ' },
    { id: 'News', label: 'খবর' },
    { id: 'Interview', label: 'সাক্ষাৎকার' },
    { id: 'PressNote', label: 'প্রেস নোট' }
  ];

  return (
    <section id="news" className="section-container bg-slate-50/50">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          Media Coverage
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          সংবাদ ও মিডিয়া <span className="text-gradient">কাভারেজ</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          লুৎফুর রহমান কাজলের সাম্প্রতিক কর্মকাণ্ড নিয়ে গণমাধ্যমের প্রতিবেদন
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {filterOptions.map((option) => (
            <button 
              key={option.id}
              onClick={() => setFilter(option.id as any)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border",
                filter === option.id 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-primary/30 hover:bg-primary/5"
              )}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredNews.map((item, index) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full hover:border-primary/30 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-primary text-xs font-black uppercase tracking-wider shadow-xl border border-white/20">
                    {item.type === 'News' && 'খবর'}
                    {item.type === 'Interview' && 'সাক্ষাৎকার'}
                    {item.type === 'PressNote' && 'প্রেস নোট'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-primary">
                    <Newspaper size={14} />
                    {item.source}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {item.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-display font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed bengali-text">
                  {item.summary}
                </p>
                
                <div className="pt-6 border-t border-slate-100 mt-auto">
                  {(item as any).isInternal ? (
                    <Link 
                      to={item.link} 
                      className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider hover:gap-3 transition-all group/link"
                    >
                      আরও পড়ুন 
                      <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  ) : (
                    <a 
                      href={item.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider hover:gap-3 transition-all group/link"
                    >
                      আরও পড়ুন 
                      <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default News;
