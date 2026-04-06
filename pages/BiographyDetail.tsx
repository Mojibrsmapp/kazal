import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Info } from 'lucide-react';
import { TIMELINE_DATA } from '../constants';
import PageWrapper from '../components/PageWrapper';
import SEO from '../components/SEO';
import { TimelineEvent } from '../types';

const BiographyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = TIMELINE_DATA.find((e: TimelineEvent) => e.slug === slug);

  if (!event) {
    return <Navigate to="/Biography" replace />;
  }

  return (
    <PageWrapper>
      <SEO 
        title={`${event.title} - লুৎফুর রহমান কাজল`}
        description={event.description}
        canonical={`http://kazal.pro.bd/biography/${event.slug}`}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/Biography" 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            জীবনীতে ফিরে যান
          </Link>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {event.image && (
              <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500 text-white text-sm font-bold mb-4 shadow-lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.year}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      {event.title}
                    </h1>
                  </div>
                </div>
              </div>
            )}

            <div className="p-8 md:p-12">
              {!event.image && (
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.year}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    {event.title}
                  </h1>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <div className="prose prose-lg prose-emerald max-w-none">
                    <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8 border-l-4 border-emerald-500 pl-6 italic">
                      {event.description}
                    </p>
                    <div className="text-gray-700 leading-loose space-y-6 text-lg">
                      {event.fullContent || event.description}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-emerald-600" />
                      দ্রুত তথ্য
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">সময়কাল</p>
                          <p className="text-gray-900 font-medium">{event.year}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <User className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">ব্যক্তিত্ব</p>
                          <p className="text-gray-900 font-medium">লুৎফুর রহমান কাজল</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
                    <h3 className="font-bold mb-2">জনসেবায় নিবেদিত</h3>
                    <p className="text-emerald-50 text-sm leading-relaxed">
                      কক্সবাজারের মাটি ও মানুষের কল্যাণে লুৎফুর রহমান কাজল নিরলসভাবে কাজ করে যাচ্ছেন।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default BiographyDetail;
