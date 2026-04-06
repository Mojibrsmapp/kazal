import React from 'react';
import { RESPONSIBILITIES_DATA } from '../constants';
import { Gavel, Flag, Heart, Briefcase, Activity, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  'Gavel': <Gavel size={32} />,
  'Flag': <Flag size={32} />,
  'Heart': <Heart size={32} />,
  'Briefcase': <Briefcase size={32} />,
  'Default': <Activity size={32} />
};

const Responsibilities: React.FC = () => {
  return (
    <section id="responsibilities" className="section-container bg-slate-50/50">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          Leadership Roles
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          রাজনৈতিক ও সামাজিক <span className="text-gradient">দায়িত্বসমূহ</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          জাতীয় সংসদ, বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি) এবং সামাজিকভাবে পালিত বিভিন্ন গুরুত্বপূর্ণ দায়িত্ব।
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {RESPONSIBILITIES_DATA.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-10 rounded-[40px] group hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors duration-500" />
            
            <div className="relative z-10">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5"
              >
                {iconMap[item.iconName] || iconMap['Default']}
              </motion.div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                    Official Role
                  </span>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight bengali-text">
                  {item.title}
                </h3>
                
                <div className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {item.role}
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed bengali-text group-hover:text-slate-600 transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Responsibilities;
