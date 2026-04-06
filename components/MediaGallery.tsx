
import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { PlayCircle, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const MediaGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Political' | 'Development' | 'Social' | 'Family'>('All');

  const filteredImages = activeCategory === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const categories = [
    { id: 'All', label: 'সব' },
    { id: 'Political', label: 'রাজনৈতিক' },
    { id: 'Development', label: 'উন্নয়ন' },
    { id: 'Social', label: 'সামাজিক' },
    { id: 'Family', label: 'পারিবারিক' }
  ];

  return (
    <section id="media" className="section-container bg-white">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          Visual Moments
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          ফটো ও ভিডিও <span className="text-gradient">গ্যালারি</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          জনসভা, উন্নয়ন কার্যক্রম এবং সামাজিক মুহূর্তের স্থিরচিত্র
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border",
                activeCategory === cat.id 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-primary/30 hover:bg-primary/5"
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((item, index) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-3xl aspect-square cursor-pointer shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <img 
                src={item.url} 
                alt={item.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-lg border border-white/20">
                  {item.category === 'Political' && 'রাজনৈতিক'}
                  {item.category === 'Development' && 'উন্নয়ন'}
                  {item.category === 'Social' && 'সামাজিক'}
                  {item.category === 'Family' && 'পারিবারিক'}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                 <motion.div
                   initial={{ scale: 0.5, opacity: 0 }}
                   whileHover={{ scale: 1.1 }}
                   className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 border border-white/30"
                 >
                   {item.type === 'video' ? <PlayCircle size={32} /> : <Maximize2 size={28} />}
                 </motion.div>
                 <p className="text-white font-display font-bold text-lg leading-tight bengali-text transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   {item.caption}
                 </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default MediaGallery;
