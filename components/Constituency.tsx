import React from 'react';
import { MapPin, Users, TrendingUp, Sun, ArrowUpRight, Ruler, Building2, Landmark, CheckCircle2, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

const Constituency: React.FC = () => {
  const mainStats = [
    { icon: <Ruler size={24} />, label: "আয়তন", value: "৭৭২.৫ বর্গ কিলোমিটার" },
    { icon: <Building2 size={24} />, label: "পৌরসভা", value: "১ টি (কক্সবাজার)" },
    { icon: <Landmark size={24} />, label: "উপজেলা", value: "৩ টি (সদর, রামু ও ঈদগাঁও)" },
    { icon: <TrendingUp size={24} />, label: "অর্থনীতি", value: "মৎস্য, লবণ, শুঁটকি ও পর্যটন" }
  ];

  const populationStats = [
    { label: "মোট জনসংখ্যা", value: "১০,৮১,৩৪৬" },
    { label: "পুরুষ", value: "৫,২৩,০৫৮" },
    { label: "নারী", value: "৪,৭২,২৮২" }
  ];

  const voterStats = [
    { label: "মোট ভোটার", value: "৫,৪৫,৯৬৩" },
    { label: "পুরুষ ভোটার", value: "২,৯১,১০০ জন" },
    { label: "নারী ভোটার", value: "২,৫৪,৮৬২ জন" },
    { label: "তৃতীয় লিঙ্গ", value: "১ জন" }
  ];

  const centerStats = [
    { label: "মোট কেন্দ্র", value: "১৮২" },
    { label: "মোট বুথ", value: "১,১০৭" }
  ];

  const areas = [
    "কক্সবাজার পৌরসভা",
    "কক্সবাজার সদর উপজেলা",
    "রামু উপজেলা",
    "ঈদগাঁও উপজেলা"
  ];

  return (
    <section id="constituency" className="section-container bg-white">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2 space-y-10"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
            >
              Constituency Profile
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
            >
              কক্সবাজার-৩ নির্বাচনী <span className="text-gradient">এলাকা</span>
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-display font-bold text-secondary mb-4"
            >
              সংসদীয় আসন ২৯৬ (সদর-রামু-ঈদগাঁও)
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-lg leading-relaxed bengali-text"
            >
              কক্সবাজার-৩ আসনটি বাংলাদেশের পর্যটন ও অর্থনীতির অন্যতম কেন্দ্রবিন্দু। সদর, রামু ও ঈদগাঁও উপজেলা নিয়ে গঠিত এই জনপদ উন্নয়নের রোল মডেল হতে পারে।
            </motion.p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mainStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card p-6 rounded-2xl flex items-start gap-4 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900">{stat.label}</h4>
                  <p className="text-sm text-slate-500 bengali-text">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Stats Accordion-like Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100"
              >
                <h4 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users size={18} className="text-primary" /> জনসংখ্যা
                </h4>
                <div className="space-y-2">
                  {populationStats.map((s, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-500">{s.label}</span>
                      <span className="font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100"
              >
                <h4 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-primary" /> ভোটার তথ্য
                </h4>
                <div className="space-y-2">
                  {voterStats.map((s, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-500">{s.label}</span>
                      <span className="font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100"
              >
                <h4 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LayoutGrid size={18} className="text-primary" /> ভোট কেন্দ্র ও বুথ
                </h4>
                <div className="space-y-2">
                  {centerStats.map((s, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-500">{s.label}</span>
                      <span className="font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100"
              >
                <h4 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" /> অন্তর্ভুক্ত এলাকা
                </h4>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600">
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2 w-full sticky top-32"
        >
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl glass-card p-4 bg-white">
            <div className="mb-4 flex items-center justify-between px-4">
              <h4 className="font-display font-bold text-slate-900">নির্বাচনী এলাকা ম্যাপ</h4>
              <a 
                href="https://maps.google.com/maps?ll=21.427194,91.988194&z=16&t=m&hl=en&gl=BD&mapclient=embed" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
              >
                গুগল ম্যাপে দেখুন <ArrowUpRight size={14} />
              </a>
            </div>
            
            <div className="w-full aspect-square md:aspect-video lg:aspect-square rounded-[32px] overflow-hidden border border-slate-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d59300.26435013054!2d91.988194!3d21.427194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1712380000000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Constituency Map"
              ></iframe>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -z-10" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Constituency;
