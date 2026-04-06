
import React from 'react';
import { MESSAGE_DATA } from '../constants';
import { Quote, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const Message: React.FC = () => {
  return (
    <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl mb-12 shadow-2xl shadow-primary/20 relative group"
            >
                <Quote size={48} className="text-white transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary shadow-lg animate-bounce">
                  <Sparkles size={12} />
                </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-6xl font-display font-black mb-12 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
            >
                "{MESSAGE_DATA.title}"
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative mb-16"
            >
              <p className="text-xl md:text-3xl font-medium text-slate-300 italic leading-relaxed bengali-text max-w-4xl mx-auto">
                  "{MESSAGE_DATA.content}"
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center"
            >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse" />
                  <img 
                      src="https://image.mojib.me/uploads/General/1775299892_aece70c0-28d9-4dc1-8e43-3fa8491228a3.png" 
                      alt={MESSAGE_DATA.author} 
                      className="w-28 h-28 rounded-full border-4 border-white/10 shadow-2xl relative z-10 object-cover"
                      referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-1 tracking-wide uppercase">
                  {MESSAGE_DATA.author}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-primary/50" />
                  <span className="text-primary font-bold text-sm uppercase tracking-widest">
                    সংসদ সদস্য, কক্সবাজার-৩
                  </span>
                  <div className="w-8 h-[1px] bg-primary/50" />
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Message;
