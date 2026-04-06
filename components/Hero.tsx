
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-mesh z-0 opacity-40"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-3/5 space-y-8 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              কক্সবাজার-৩ (সদর-রামু-ঈদগাঁও)
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.1] text-slate-900"
              >
                লুৎফুর রহমান <br />
                <span className="text-gradient">কাজল</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0"
              >
                Member of Parliament (13th National Election) & Chairman, Niribili Group
              </motion.p>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate-500 max-w-xl leading-relaxed mx-auto lg:mx-0"
            >
              গণতন্ত্র, উন্নয়ন এবং জনগণের অধিকার আদায়ের সংগ্রামে সর্বদা অবিচল। কক্সবাজার-০৩ আসনের নির্বাচিত সংসদ সদস্য (১৩তম জাতীয় সংসদ)।
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
            >
              <Link 
                to="/biography" 
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                বিস্তারিত জানুন
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="btn-secondary flex items-center justify-center gap-2"
              >
                যোগাযোগ করুন
              </Link>
            </motion.div>
          </motion.div>

          {/* Profile Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-2/5 relative"
          >
            <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] mx-auto">
              {/* Decorative Rings */}
              <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-4 border border-secondary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-50" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl glass-card p-0">
                <img 
                  src="https://image.mojib.me/uploads/General/1775299892_aece70c0-28d9-4dc1-8e43-3fa8491228a3.png" 
                  alt="Lutfur Rahman Kajal" 
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-4 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Play size={20} fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Current Status</div>
                    <div className="text-sm font-bold text-slate-900">Member of Parliament</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
