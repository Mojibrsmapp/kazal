import React from 'react';
import { User, BookOpen, Briefcase, Flag, Award, Heart, ShieldCheck, TrendingUp, History } from 'lucide-react';
import { motion } from 'motion/react';
import { POLITICAL_CAREER_DATA, BUSINESS_LEADERSHIP_DATA, MOVEMENTS_DATA } from '../constants';

const BioCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay: number }> = ({ icon, title, children, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-8 rounded-3xl group hover:border-primary/30 transition-all duration-500"
  >
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{title}</h3>
    <div className="text-slate-600 leading-relaxed bengali-text">
      {children}
    </div>
  </motion.div>
);

const Biography: React.FC = () => {
  return (
    <section id="biography" className="section-container relative">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4"
        >
          Our Leader's Journey
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          লুৎফুর রহমান কাজলের <span className="text-gradient">জীবনী</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          একজন বিশিষ্ট রাজনীতিবিদ, শিল্প উদ্যোক্তা এবং সমাজসেবক হিসেবে তাঁর বর্ণাঢ্য কর্মময় জীবন ও রাজনৈতিক ইতিহাস।
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <BioCard icon={<User size={28} />} title="প্রারম্ভিক জীবন" delay={0.1}>
          লুৎফুর রহমান কাজল ১৮ নভেম্বর ১৯৬৬ সালে কক্সবাজার জেলার পোকখালীর গোমাতলী ইউনিয়নে এক সম্ভ্রান্ত পরিবারে জন্মগ্রহণ করেন। তাঁর পিতা মরহুম আলহাজ মোস্তাফিজুর রহমান ছিলেন একজন স্বনামধন্য শিক্ষানুরাগী, বিশিষ্ট শিল্পপতি ও সমাজসেবক।
        </BioCard>

        <BioCard icon={<Heart size={28} />} title="পারিবারিক ঐতিহ্য" delay={0.2}>
          তাঁর মাতা ছালেহা খানম একজন স্কুল শিক্ষিকা এবং জিয়াউর রহমান শাসনামলে দক্ষিণ চট্টগ্রাম অঞ্চলের একজন মহিলা সংসদ সদস্য ও মানবিক রাজনীতিবিদ হিসেবে দায়িত্ব পালন করেন। তিনি উপকূলীয় মানবতার কল্যাণে নিরলসভাবে কাজ করেছেন।
        </BioCard>

        <BioCard icon={<Flag size={28} />} title="রাজনৈতিক পথচলা" delay={0.3}>
          ছাত্রজীবন থেকেই তিনি বাংলাদেশ জাতীয়তাবাদী ছাত্রদলের রাজনীতির সঙ্গে জড়িত ছিলেন। ক্রমান্বয়ে তিনি বিএনপির জাতীয় নির্বাহী কমিটির মৎস্যজীবী বিষয়ক সম্পাদক নির্বাচিত হন এবং কক্সবাজার-০৩ আসন থেকে সংসদ সদস্য হিসেবে দায়িত্ব পালন করেন।
        </BioCard>

        <BioCard icon={<Award size={28} />} title="সংসদীয় নেতৃত্ব" delay={0.4}>
          তিনি কক্সবাজার-০৩ আসন থেকে বিএনপির প্রার্থী হিসেবে সংসদ সদস্য নির্বাচিত হন। বর্তমানে তিনি ত্রয়োদশ জাতীয় সংসদ নির্বাচনে একই আসন থেকে বিপুল ভোটে নির্বাচিত হয়ে সংসদ সদস্য হিসেবে দায়িত্ব পালন করছেন।
        </BioCard>

        <BioCard icon={<Briefcase size={28} />} title="পেশা ও শিল্প উদ্যোগ" delay={0.5}>
          বর্তমানে তিনি স্বনামধন্য 'নিরিবিলি গ্রুপ'-এর চেয়ারম্যান হিসেবে দায়িত্ব পালন করছেন। তাঁর পিতা এই গ্রুপের প্রতিষ্ঠাতা ছিলেন। তিনি রাজনীতির পাশাপাশি সফলভাবে শিল্প প্রতিষ্ঠান পরিচালনা করে আসছেন।
        </BioCard>

        <BioCard icon={<BookOpen size={28} />} title="ব্যক্তিগত জীবন" delay={0.6}>
          লুৎফুর রহমান কাজলের সহধর্মিণী জনাবা শিরিন রহমান। কাজল-শিরিন দম্পত্তির দুই ছেলে—তাহসিন লুৎফুর ও সাইফ রহমান। তাঁদের পরিবারে চার ছেলে ও এক মেয়ের মধ্যে তিনি জ্যেষ্ঠ।
        </BioCard>
      </div>

      {/* Detailed Political Career */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-3xl font-display font-bold text-slate-900 bengali-text">রাজনৈতিক ক্যারিয়ার</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {POLITICAL_CAREER_DATA.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4"
            >
              <div className="text-primary font-bold text-lg whitespace-nowrap pt-1">{milestone.period}</div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 bengali-text">{milestone.organization}</h4>
                <p className="text-slate-600 bengali-text">{milestone.role}</p>
                {milestone.description && <p className="text-sm text-slate-500 mt-2 bengali-text">{milestone.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Business & Industry Leadership */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-3xl font-display font-bold text-slate-900 bengali-text">ব্যবসা ও শিল্পখাত নেতৃত্ব</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_LEADERSHIP_DATA.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-secondary/30 transition-all group"
            >
              <div className="text-sm font-bold text-secondary mb-2">{role.period}</div>
              <h4 className="font-bold text-slate-900 mb-2 bengali-text group-hover:text-secondary transition-colors">{role.organization}</h4>
              <p className="text-slate-600 bengali-text">{role.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Movements Section */}
      <div>
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <History size={24} />
          </div>
          <h3 className="text-3xl font-display font-bold text-slate-900 bengali-text">আন্দোলন ও সংগ্রাম</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOVEMENTS_DATA.map((movement, index) => (
            <motion.div
              key={movement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-slate-900 text-white overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <History size={80} />
              </div>
              <div className="relative z-10">
                <div className="text-primary font-bold mb-2">{movement.period}</div>
                <h4 className="text-xl font-bold mb-4 bengali-text">{movement.title}</h4>
                <div className="inline-block px-3 py-1 rounded-lg bg-white/10 text-sm mb-4 bengali-text">
                  {movement.role}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed bengali-text">
                  {movement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Biography;
