import React from 'react';
import { TIMELINE_DATA } from '../constants';
import { motion } from 'motion/react';
import { Calendar, ChevronRight } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="section-container bg-slate-50/50">
      <div className="text-center mb-20">
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

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 md:-translate-x-1/2" />

        <div className="space-y-12">
          {TIMELINE_DATA.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full md:-translate-x-1/2 z-10 shadow-lg shadow-primary/20" />

              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
              }`}>
                <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-center gap-2 text-primary font-bold mb-3">
                    <Calendar size={18} />
                    <span className="text-lg">{item.year}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed bengali-text">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Read More <ChevronRight size={16} />
                  </div>
                </div>
              </div>

              {/* Year Label for Desktop */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
