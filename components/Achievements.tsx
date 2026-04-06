import React from 'react';
import { ACHIEVEMENTS_DATA, DEVELOPMENT_WORKS_DATA } from '../constants';
import { motion } from 'motion/react';
import { Award, Star, CheckCircle, TrendingUp, Construction, GraduationCap, Stethoscope, Sprout, Droplets, Zap, HeartHandshake, UserPlus } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Construction': <Construction size={32} />,
  'GraduationCap': <GraduationCap size={32} />,
  'Stethoscope': <Stethoscope size={32} />,
  'Sprout': <Sprout size={32} />,
  'Droplets': <Droplets size={32} />,
  'Zap': <Zap size={32} />,
  'HeartHandshake': <HeartHandshake size={32} />,
  'UserPlus': <UserPlus size={32} />,
};

const Achievements: React.FC = () => {
  const icons = [<Award size={32} />, <Star size={32} />, <CheckCircle size={32} />, <TrendingUp size={32} />];

  return (
    <section id="achievements" className="section-container relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          Milestones & Success
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          সাফল্য ও <span className="text-gradient">অর্জিত মাইলফলক</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          জনসেবা এবং উন্নয়নের যাত্রায় লুৎফুর রহমান কাজলের উল্লেখযোগ্য কিছু সাফল্য ও অর্জন।
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {ACHIEVEMENTS_DATA.map((achievement, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-8 rounded-3xl group hover:border-primary/30 transition-all duration-500 ${
              index === 0 || index === 3 ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              {icons[index % icons.length]}
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
              {achievement.title}
            </h3>
            <p className="text-slate-600 leading-relaxed bengali-text">
              {achievement.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Development Works Section */}
      <div className="mt-32">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 bengali-text">এলাকার উন্নয়নমূলক কাজসমূহ</h3>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DEVELOPMENT_WORKS_DATA.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                {iconMap[work.iconName]}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 bengali-text">{work.title}</h4>
              <p className="text-slate-600 text-sm bengali-text leading-relaxed">{work.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
