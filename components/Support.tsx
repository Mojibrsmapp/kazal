import React from 'react';
import { SUPPORT_DATA } from '../constants';
import { Handshake, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Support: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card bg-white/5 border-white/10 p-8 md:p-16 rounded-[40px] backdrop-blur-xl relative overflow-hidden group"
        >
          {/* Decorative Corner */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="lg:w-2/3 space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                 <motion.div 
                   animate={{ rotate: [0, 10, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4 }}
                   className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary border border-white/10 shadow-2xl"
                 >
                    <Handshake size={36} />
                 </motion.div>
                 <div className="flex flex-col">
                   <span className="text-primary font-black text-xs uppercase tracking-[0.2em] mb-1">Collaboration</span>
                   <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
                     {SUPPORT_DATA.title}
                   </h2>
                 </div>
              </div>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed bengali-text max-w-2xl">
                {SUPPORT_DATA.description}
              </p>
            </div>
            
            <div className="lg:w-1/3 flex justify-center lg:justify-end w-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link 
                  to="/contact" 
                  className="group/btn relative inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-white text-slate-950 font-black text-lg px-12 py-5 rounded-2xl shadow-2xl shadow-white/10 hover:bg-primary hover:text-white transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {SUPPORT_DATA.actionText}
                    <ArrowRight size={22} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats or Badges */}
          <div className="mt-12 pt-12 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles size={16} className="text-primary" />
              উন্নয়নমূলক কর্মকাণ্ড
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles size={16} className="text-primary" />
              সামাজিক দায়বদ্ধতা
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles size={16} className="text-primary" />
              জনগণের ক্ষমতায়ন
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Support;
