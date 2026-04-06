import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Youtube, Twitter, Instagram, ArrowUp, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 blur-[120px] -z-10" />
      
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-display font-black mb-4 tracking-tight">
                লুৎফুর রহমান <span className="text-gradient">কাজল</span>
              </h2>
              <p className="text-slate-400 max-w-md text-lg leading-relaxed bengali-text">
                সংসদ সদস্য (১৩তম জাতীয় সংসদ), কক্সবাজার-৩। <br/>
                দেশের উন্নয়ন ও মানুষের কল্যাণে নিবেদিত প্রাণ। কক্সবাজারের গণমানুষের আস্থার প্রতীক।
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <Facebook size={20} />, href: "#", color: "hover:bg-[#1877F2]" },
                { icon: <Youtube size={20} />, href: "#", color: "hover:bg-[#FF0000]" },
                { icon: <Twitter size={20} />, href: "#", color: "hover:bg-[#1DA1F2]" },
                { icon: <Instagram size={20} />, href: "#", color: "hover:bg-[#E4405F]" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/10 ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-white">দ্রুত লিংক</h3>
            <ul className="space-y-4">
              {[
                { label: "জীবনী", href: "#biography" },
                { label: "সাফল্য", href: "#achievements" },
                { label: "মিডিয়া গ্যালারি", href: "#media" },
                { label: "যোগাযোগ", href: "#contact" }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-400 hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-white">তথ্যসূত্র</h3>
            <ul className="space-y-4">
              {[
                { label: "বাংলাদেশ জাতীয় সংসদ", href: "https://www.parliament.gov.bd/" },
                { label: "নির্বাচন কমিশন", href: "https://www.ecs.gov.bd/" },
                { label: "বিএনপি অফিসিয়াল সাইট", href: "https://www.bnpbd.org/" }
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-sm flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} লুৎফুর রহমান কাজল। সর্বস্বত্ব সংরক্ষিত।</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ArrowUp size={24} />
          </motion.button>

          <div className="text-slate-500 text-sm flex items-center gap-1.5">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by 
            <a href="#" className="text-white font-medium hover:text-primary transition-colors">Mojib Rsm</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
