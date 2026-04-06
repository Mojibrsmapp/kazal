import React from 'react';
import { Link } from 'react-router-dom';
import { TIMELINE_DATA } from '../constants';
import { motion } from 'motion/react';
import { Calendar, ChevronRight } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="section-container bg-slate-50/50 !pt-0">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          Political Journey
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          রাজনৈতিক <span className="text-gradient">ঘটনাক্রম</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          জনগণের অধিকার আদায়ের সংগ্রামে লুৎফুর রহমান কাজলের রাজনৈতিক পথচলার গুরুত্বপূর্ণ মাইলফলকসমূহ।
        </motion.p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 md:-translate-x-1/2" />

        <div className="space-y-8 md:space-y-0">
          {TIMELINE_DATA.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-8 md:mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-5 h-5 bg-white border-4 border-primary rounded-full -translate-x-1/2 z-10 shadow-lg shadow-primary/20" />

              {/* Content Card */}
              <div className={`w-full md:w-[45%] ml-16 md:ml-0 ${
                index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
              }`}>
                <Link to={`/biography/${item.slug}`} className="block group">
                  <div className="glass-card p-6 rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-slate-200/60 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <Calendar size={18} />
                        <span className="text-lg">{item.year}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed bengali-text line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-bold border-b-2 border-transparent group-hover:border-primary transition-all">
                      আরও পড়ুন
                    </div>
                  </div>
                </Link>
              </div>

              {/* Spacer for Desktop */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
