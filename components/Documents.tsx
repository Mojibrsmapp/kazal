import React from 'react';
import { DOCUMENTS_DATA } from '../constants';
import { FileText, Download, File } from 'lucide-react';

const Documents: React.FC = () => {
  return (
    <section id="documents" className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
             <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    ডাউনলোড সেন্টার
                </h2>
                <p className="text-gray-500">গুরুত্বপূর্ণ নথিপত্র এবং প্রতিবেদন</p>
             </div>
             <button className="hidden md:flex items-center text-primary-600 font-semibold hover:underline mt-4 md:mt-0">
                 সকল ডকুমেন্ট দেখুন &rarr;
             </button>
        </div>
       

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCUMENTS_DATA.map((doc) => (
            <div key={doc.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition duration-300 flex flex-col justify-between group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {doc.type}
                </span>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">{doc.title}</h4>
                <p className="text-xs text-gray-500 mb-4">প্রকাশকাল: {doc.date} | আকার: {doc.size}</p>
              </div>

              <button className="w-full mt-auto py-2 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 flex items-center justify-center gap-2 transition-colors">
                <Download size={16} />
                ডাউনলোড করুন
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documents;