
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, Facebook, Youtube, Printer, Users, Send, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const Contact: React.FC = () => {
  const [formType, setFormType] = useState<'Message' | 'Volunteer'>('Message');
  const [designation, setDesignation] = useState('কোনো পদ নেই');

  return (
    <section id="contact" className="section-container relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          Get In Touch
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
        >
          যোগাযোগ ও <span className="text-gradient">টিম</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          লুৎফুর রহমান কাজলের সাথে যোগাযোগের বিস্তারিত তথ্য এবং আমাদের ক্যাম্পেইন টিমে যোগ দেওয়ার সুযোগ।
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="space-y-8">
            {/* Address Section */}
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                <MapPin size={28} />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-display font-bold text-slate-900 mb-1">ঢাকা ঠিকানা</h4>
                  <p className="text-slate-600 bengali-text">{CONTACT_INFO.dhakaAddress}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xl font-display font-bold text-slate-900 mb-1">স্থায়ী ঠিকানা</h4>
                  <p className="text-slate-600 bengali-text">{CONTACT_INFO.permanentAddress}</p>
                </div>
              </div>
            </div>

            {/* Phones Section */}
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shrink-0">
                <Phone size={28} />
              </div>
              <div className="w-full">
                <h4 className="text-xl font-display font-bold text-slate-900 mb-4">ফোন নম্বরসমূহ</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600 bengali-text">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-1">মোবাইল</span>
                    <span className="font-bold text-slate-900">{CONTACT_INFO.phones.cell}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-1">অফিস</span>
                    <span className="font-bold text-slate-900">{CONTACT_INFO.phones.office}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                <Mail size={28} />
              </div>
              <div>
                <h4 className="text-xl font-display font-bold text-slate-900 mb-3">ইমেইল</h4>
                <div className="space-y-2">
                  {CONTACT_INFO.emails.map((email, idx) => (
                    <a 
                      key={idx} 
                      href={`mailto:${email}`}
                      className="block text-lg font-medium text-primary hover:text-primary-light transition-colors"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-100">
            <h4 className="text-xl font-display font-bold text-slate-900 mb-6">সোশ্যাল মিডিয়া</h4>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                <Facebook size={28} />
              </a>
              <a href={CONTACT_INFO.youtube} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-red-200">
                <Youtube size={28} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/50"
        >
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-10">
            <button 
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2",
                formType === 'Message' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
              onClick={() => setFormType('Message')}
            >
              <Send size={18} />
              বার্তা পাঠান
            </button>
            <button 
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2",
                formType === 'Volunteer' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
              onClick={() => setFormType('Volunteer')}
            >
              <UserPlus size={18} />
              ভলান্টিয়ার হোন
            </button>
          </div>

          <AnimatePresence mode="wait">
            {formType === 'Message' ? (
              <motion.form 
                key="message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6" 
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">আপনার নাম</label>
                  <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="নাম লিখুন" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">ফোন নম্বর</label>
                  <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="ফোন নম্বর" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">বার্তা</label>
                  <textarea rows={4} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="আপনার মতামত বা পরামর্শ লিখুন..."></textarea>
                </div>
                <button type="submit" className="w-full btn-primary py-4 text-lg">
                  বার্তা প্রেরণ করুন
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="volunteer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6" 
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="p-5 bg-primary/5 rounded-2xl text-sm text-primary font-medium flex items-start gap-3 border border-primary/10">
                  <Users size={20} className="shrink-0" />
                  আমাদের নির্বাচনী প্রচারণায় স্বেচ্ছাসেবী হিসেবে যোগ দিন এবং পরিবর্তনের অংশ হোন।
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">আপনার নাম</label>
                  <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="পূর্ণ নাম" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">বয়স</label>
                    <input type="number" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="বয়স" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">উপজেলা</label>
                    <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                      <option>সদর</option>
                      <option>রামু</option>
                      <option>ঈদগাঁও</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">বর্তমান পদবী</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    <option value="কোনো পদ নেই">কোনো পদ নেই</option>
                    <option value="সদস্য">সদস্য</option>
                    <option value="কর্মী">কর্মী</option>
                    <option value="সভাপতি">সভাপতি</option>
                    <option value="সাধারণ সম্পাদক">সাধারণ সম্পাদক</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                  
                  <AnimatePresence>
                    {designation === 'অন্যান্য' && (
                      <motion.input 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        type="text" 
                        className="w-full mt-2 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                        placeholder="আপনার পদবী লিখুন" 
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">মোবাইল নম্বর</label>
                  <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="সচল মোবাইল নম্বর" />
                </div>
                <button type="submit" className="w-full btn-primary py-4 text-lg">
                  টিমে যোগ দিন
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
