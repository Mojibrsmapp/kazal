import React from 'react';
import { EVENTS_DATA } from '../constants';
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const Events: React.FC = () => {
  return (
    <section id="events" className="section-container bg-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4"
          >
            Upcoming Programs
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-4"
          >
            অনুষ্ঠান ও <span className="text-gradient">সম্মেলন</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg"
          >
            সাম্প্রতিক ও আসন্ন দলীয় কর্মসূচি
          </motion.p>
        </div>
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
        >
          সকল ইভেন্ট দেখুন 
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS_DATA.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full hover:border-secondary/30 transition-all duration-500"
          >
            <div className={cn(
              "h-2 w-full",
              event.type === 'Upcoming' ? 'bg-secondary' : 'bg-slate-300'
            )} />
            
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border",
                  event.type === 'Upcoming' 
                    ? 'bg-secondary/10 text-secondary border-secondary/20' 
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                )}>
                  {event.type === 'Upcoming' ? 'আসন্ন' : 'সম্পন্ন'}
                </span>
                
                <div className="text-center bg-slate-50 rounded-2xl p-3 min-w-[70px] border border-slate-100 shadow-sm group-hover:bg-white transition-colors">
                  <span className="block text-2xl font-display font-black text-slate-900 leading-none mb-1">
                    {event.date.split(',')[0].split(' ')[0]}
                  </span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {event.date.split(',')[0].split(' ')[1]}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-secondary transition-colors leading-tight bengali-text">
                {event.title}
              </h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-secondary shrink-0">
                    <Calendar size={16} />
                  </div>
                  {event.date}
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-secondary shrink-0">
                    <MapPin size={16} />
                  </div>
                  {event.location}
                </div>
              </div>

              <p className="text-slate-500 text-sm mb-8 flex-grow leading-relaxed bengali-text line-clamp-3">
                {event.description}
              </p>

              <button className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 font-bold text-sm border border-slate-100 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                বিস্তারিত দেখুন
                <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Events;
