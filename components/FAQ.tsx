
import React, { useState } from 'react';
import { FAQ_DATA } from '../constants';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-container bg-slate-50/50">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          Common Questions
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          সচরাচর জিজ্ঞাসিত <span className="text-gradient">প্রশ্ন</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          লুৎফুর রহমান কাজল, তাঁর রাজনীতি এবং উন্নয়ন ভাবনা সম্পর্কে সাধারণ কিছু প্রশ্নের উত্তর।
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQ_DATA.map((faq, index) => (
          <motion.div 
            key={faq.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "glass-card rounded-3xl overflow-hidden transition-all duration-500 border",
              openIndex === index ? "border-primary/30 shadow-2xl shadow-primary/5" : "border-slate-100"
            )}
          >
            <button
              className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  openIndex === index ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                )}>
                  <HelpCircle size={20} />
                </div>
                <span className={cn(
                  "font-display font-bold text-lg md:text-xl transition-colors bengali-text leading-tight",
                  openIndex === index ? 'text-primary' : 'text-slate-900'
                )}>
                  {faq.question}
                </span>
              </div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "shrink-0 transition-colors",
                  openIndex === index ? "text-primary" : "text-slate-400"
                )}
              >
                <ChevronDown size={24} />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-8 pb-8 pt-2">
                    <div className="pl-14 text-slate-600 leading-relaxed bengali-text text-lg border-l-2 border-primary/20">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
