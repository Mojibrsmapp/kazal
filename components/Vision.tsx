
import React from 'react';
import { VISION_DATA, COMMITMENTS_DATA } from '../constants';
import { Palmtree, GraduationCap, ShieldCheck, Briefcase, Fish, Truck, Lightbulb, ShieldAlert, Waves, Leaf, Users, Lock, CheckCircle2, Plane, Store, Zap, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: Record<string, React.ReactNode> = {
  'Palmtree': <Palmtree size={32} />,
  'GraduationCap': <GraduationCap size={32} />,
  'ShieldCheck': <ShieldCheck size={32} />,
  'Briefcase': <Briefcase size={32} />,
  'Fish': <Fish size={32} />,
  'Truck': <Truck size={32} />,
  'ShieldAlert': <ShieldAlert size={32} />,
  'Waves': <Waves size={32} />,
  'Leaf': <Leaf size={32} />,
  'Users': <Users size={32} />,
  'Lock': <Lock size={32} />,
  'Plane': <Plane size={32} />,
  'Store': <Store size={32} />,
  'Zap': <Zap size={32} />,
  'Droplets': <Droplets size={32} />,
  'Default': <Lightbulb size={32} />
};

const Vision: React.FC = () => {
  return (
    <section id="vision" className="section-container relative">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          Development Vision
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          উন্নয়ন ভিশন ও <span className="text-gradient">প্রতিশ্রুতি</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          কক্সবাজার-৩ আসনের উন্নয়নে আমার সুনির্দিষ্ট পরিকল্পনা ও প্রতিশ্রুতি।
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {VISION_DATA.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 rounded-3xl group hover:border-primary/30 transition-all duration-500 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 mx-auto">
              {iconMap[item.iconName] || iconMap['Default']}
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-600 leading-relaxed bengali-text">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Detailed Commitments Section */}
      <div className="mt-32">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 bengali-text">জনগণের জন্য আমার প্রতিশ্রুতি</h3>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {COMMITMENTS_DATA.map((commitment, index) => (
            <motion.div
              key={commitment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  {iconMap[commitment.iconName] || iconMap['Default']}
                </div>
                <div>
                  <h4 className="text-2xl font-display font-bold text-slate-900 mb-3 bengali-text">{commitment.title}</h4>
                  <p className="text-slate-600 mb-6 bengali-text leading-relaxed">{commitment.description}</p>
                  <ul className="space-y-3">
                    {commitment.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 bengali-text">
                        <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
