
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-4 py-4 md:px-8",
        isScrolled ? "pt-2" : "pt-4"
      )}
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto transition-all duration-500 rounded-2xl md:rounded-3xl",
          isScrolled 
            ? "glass-navbar shadow-lg shadow-slate-200/50 py-2 px-4 md:px-6" 
            : "bg-transparent py-4 px-4 md:px-0"
        )}
      >
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="flex flex-col group relative z-50">
            <span className={cn(
              "text-xl md:text-2xl font-display font-bold leading-none transition-colors duration-300",
              isScrolled ? "text-primary" : "text-slate-900"
            )}>
              লুৎফুর রহমান <span className="text-secondary">কাজল</span>
            </span>
            <span className={cn(
              "text-[10px] md:text-xs font-medium tracking-widest uppercase mt-1 transition-colors duration-300",
              isScrolled ? "text-slate-500" : "text-slate-600"
            )}>
              Member of Parliament | Cox's Bazar-3
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.href} 
                className={({ isActive }) => cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative group",
                  isActive 
                    ? "text-primary bg-primary/5" 
                    : "text-slate-600 hover:text-primary hover:bg-slate-100/50"
                )}
              >
                {link.name}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </NavLink>
            ))}
            <Link 
              to="/contact" 
              className="ml-4 btn-primary py-2 text-sm"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-xl bg-slate-100/50 hover:bg-slate-200/50 transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} className="text-slate-900" /> : <Menu size={24} className="text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink 
                    to={link.href} 
                    className={({ isActive }) => cn(
                      "block py-4 px-4 rounded-2xl text-xl font-bold transition-all",
                      isActive ? "bg-primary/10 text-primary" : "text-slate-800 hover:bg-slate-100"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-auto pt-8 border-t border-slate-100">
              <div className="flex justify-between items-center text-slate-500 text-sm">
                <span>&copy; 2026 Lutfur Rahman Kajal</span>
                <div className="flex gap-4">
                  {/* Social placeholders */}
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
