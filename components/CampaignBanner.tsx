
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const BANNER_BG_IMAGE = "https://d2u0ktu8omkpf6.cloudfront.net/f6c28c59a4de6d27f612cb5f16171ba1db64cdf75bca42b6.jpg";

const CampaignBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      content: (
        <div className="flex items-center justify-center w-full h-full p-4">
           <motion.img 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ type: "spring", stiffness: 100, damping: 20 }}
             src="https://ik.imagekit.io/uekohag7w/bnp/mojib%20(3).gif" 
             alt="Campaign Special Banner" 
             className="w-full max-w-5xl h-auto max-h-[400px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
             referrerPolicy="no-referrer"
           />
        </div>
      )
    },
    {
      id: 1,
      content: (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6">
           <motion.div 
             initial={{ x: -50, opacity: 0, rotate: -10 }}
             animate={{ x: 0, opacity: 1, rotate: 0 }}
             transition={{ duration: 0.8, type: "spring" }}
             className="relative"
           >
              <img 
                src="https://ik.imagekit.io/uekohag7w/bnp/dhaner-shish-seeklogo.png" 
                alt="Dhaner Shish" 
                className="h-40 md:h-64 w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                referrerPolicy="no-referrer"
              />
           </motion.div>
           <div className="text-center md:text-left z-10 max-w-2xl">
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-display font-black text-white leading-tight mb-2 bengali-text"
              >
                বিপুল ভোটে বিজয়ী
              </motion.h2>
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-8xl font-display font-black text-secondary drop-shadow-glow mt-4 bengali-text"
              >
                কক্সবাজার-০৩ <span className="text-white">আসন</span>
              </motion.h2>
           </div>
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col items-center justify-center relative z-10 px-6 text-center">
            <motion.h2 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-display font-black text-white mb-8 bengali-text"
            >
               কৃতজ্ঞতা ও ধন্যবাদ
            </motion.h2>
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative mb-8"
            >
                <img 
                    src="https://ik.imagekit.io/uekohag7w/bnp/dhaner-shish-a-vote-din-seeklogo.png" 
                    alt="Vote Logo" 
                    className="h-48 md:h-72 w-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                    referrerPolicy="no-referrer"
                />
            </motion.div>
             <motion.h2 
               initial={{ y: 30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-5xl md:text-8xl font-display font-black text-secondary drop-shadow-strong bengali-text"
             >
               সকল ভোটারদের প্রতি
            </motion.h2>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[600px] md:h-[700px] bg-slate-950 overflow-hidden border-y-8 border-secondary shadow-2xl flex items-center justify-center">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950 z-10"></div>
         <motion.img 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            src={BANNER_BG_IMAGE}
            alt="Campaign Background" 
            className="w-full h-full object-cover object-center opacity-20"
            referrerPolicy="no-referrer"
         />
         {/* Animated Mesh */}
         <div className="absolute inset-0 bg-mesh opacity-30 z-10 mix-blend-overlay"></div>
      </div>

      {/* Slide Content */}
      <div className="container mx-auto px-4 relative z-20 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative h-4 transition-all duration-500"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              index === currentSlide 
                ? "bg-secondary w-16" 
                : "bg-white/20 w-8 group-hover:bg-white/40"
            )} />
          </button>
        ))}
      </div>

      {/* Side Accents */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-50" />
    </section>
  );
};

export default CampaignBanner;
