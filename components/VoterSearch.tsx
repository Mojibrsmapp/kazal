
import React, { useState } from 'react';
import { Search, Download, User, Calendar, MapPin, CheckCircle2, AlertCircle, Loader2, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';

interface VoterData {
  id: number;
  slip_id: number;
  thana: string;
  union: string;
  name: string;
  voter_no: number;
  father: string;
  mother: string;
  occupation: string;
  birth: string;
  address: string;
  gender: string;
  nid: string | null;
  mobile_no: string | null;
  is_download: boolean | null;
  voter_area: string;
  polling_booth: string;
}

const VoterSearch: React.FC = () => {
  const [searchType, setSearchType] = useState<'name' | 'father' | 'mother'>('name');
  const [searchValue, setSearchValue] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [results, setResults] = useState<VoterData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue || !birthDate) {
      setError('অনুগ্রহ করে সব তথ্য প্রদান করুন।');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      // Format birth date if needed (API expects DD/MM/YYYY based on example)
      // The input type="date" gives YYYY-MM-DD, so we convert it.
      const [year, month, day] = birthDate.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      // Use local proxy to avoid CORS issues
      const url = `/api/voter-search?${searchType}=${encodeURIComponent(searchValue)}&birth=${encodeURIComponent(formattedDate)}`;
      
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.data) {
        setResults(data.data);
        if (data.data.length === 0) {
          setError('কোন ভোটার তথ্য পাওয়া যায়নি। অনুগ্রহ করে সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।');
        }
      } else {
        setError('সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।');
      }
    } catch (err) {
      setError('নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ চেক করুন।');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (voter: VoterData) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const genderText = voter.gender === 'm' ? 'পুরুষ' : voter.gender === 'f' ? 'মহিলা' : voter.gender;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Voter Slip - ${voter.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;700&display=swap');
          body { font-family: 'Hind Siliguri', sans-serif; padding: 20px; color: #1e293b; line-height: 1.5; }
          .slip-container { 
            max-width: 550px; 
            margin: 0 auto; 
            border: 2px solid #000; 
            padding: 25px; 
            border-radius: 12px;
            background: #fff;
            position: relative;
          }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #1d4ed8; font-size: 28px; }
          .header p { margin: 5px 0 0; font-weight: bold; font-size: 18px; }
          .field { margin-bottom: 8px; display: flex; border-bottom: 1px dashed #e2e8f0; padding-bottom: 4px; }
          .label { font-weight: bold; width: 160px; color: #475569; }
          .value { flex: 1; font-weight: 500; }
          .footer { margin-top: 25px; text-align: center; font-size: 14px; color: #1e293b; border-top: 1px solid #000; pt: 10px; }
          .footer p { margin: 4px 0; font-weight: bold; }
          @media print {
            body { padding: 0; }
            .slip-container { border: 2px solid #000; width: 100%; max-width: none; }
          }
        </style>
      </head>
      <body>
        <div class="slip-container">
          <div class="header">
            <h1>লুৎফুর রহমান কাজল</h1>
            <p>ভোটার স্লিপ - ২০২৬</p>
          </div>
          <div class="field"><div class="label">ভোটার স্লিপ নাম্বার:</div><div class="value">${voter.slip_id}</div></div>
          <div class="field"><div class="label">নাম:</div><div class="value">${voter.name}</div></div>
          <div class="field"><div class="label">ভোটার নং:</div><div class="value">${voter.voter_no}</div></div>
          <div class="field"><div class="label">পিতা:</div><div class="value">${voter.father}</div></div>
          <div class="field"><div class="label">মাতা:</div><div class="value">${voter.mother}</div></div>
          <div class="field"><div class="label">লিঙ্গ:</div><div class="value">${genderText}</div></div>
          <div class="field"><div class="label">জন্ম তারিখ:</div><div class="value">${voter.birth}</div></div>
          <div class="field"><div class="label">ঠিকানা:</div><div class="value">${voter.address}</div></div>
          <div class="field"><div class="label">ভোটার এরিয়া:</div><div class="value">${voter.voter_area}</div></div>
          <div class="field"><div class="label">ভোট কেন্দ্র:</div><div class="value">${voter.polling_booth}</div></div>
          <div class="footer">
            <p>কক্সবাজার-০৩ (সদর-রামু-ঈদগাঁও)</p>
            <p>এই স্লিপটি শুধুমাত্র তথ্য প্রদানের জন্য।</p>
          </div>
        </div>
        <script>
          window.onload = () => { window.print(); window.close(); };
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 bengali-text"
        >
          ভোটার সেবা
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 bengali-text"
        >
          আপনার ভোটার স্লিপ সংগ্রহ করুন
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 max-w-2xl mx-auto bengali-text"
        >
          আপনার নাম, পিতার নাম অথবা মাতার নাম এবং জন্ম তারিখ দিয়ে সহজেই আপনার ভোটার স্লিপ খুঁজে নিন এবং ডাউনলোড করুন।
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 border border-slate-100"
      >
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setSearchType('name')}
              className={`py-3 px-4 rounded-xl font-bold transition-all bengali-text flex items-center justify-center gap-2 ${
                searchType === 'name' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <User size={18} /> নাম দিয়ে
            </button>
            <button
              type="button"
              onClick={() => setSearchType('father')}
              className={`py-3 px-4 rounded-xl font-bold transition-all bengali-text flex items-center justify-center gap-2 ${
                searchType === 'father' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <User size={18} /> পিতার নাম দিয়ে
            </button>
            <button
              type="button"
              onClick={() => setSearchType('mother')}
              className={`py-3 px-4 rounded-xl font-bold transition-all bengali-text flex items-center justify-center gap-2 ${
                searchType === 'mother' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <User size={18} /> মাতার নাম দিয়ে
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 bengali-text">
                {searchType === 'name' ? 'ভোটারের নাম' : searchType === 'father' ? 'পিতার নাম' : 'মাতার নাম'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="এখানে বাংলায় লিখুন..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bengali-text"
                />
              </div>
              <p className="text-xs text-slate-400 ml-1 bengali-text">বি:দ্র: নাম অবশ্যই বাংলায় লিখতে হবে।</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 bengali-text">জন্ম তারিখ</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={20} />
                </div>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-secondary text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/30 disabled:opacity-70 bengali-text"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={22} />}
            খুঁজুন
          </button>
        </form>
      </motion.div>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 size={48} className="text-primary animate-spin mb-4" />
              <p className="text-slate-500 font-medium bengali-text">তথ্য খোঁজা হচ্ছে...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-4 text-red-600"
            >
              <AlertCircle size={24} className="shrink-0" />
              <p className="font-medium bengali-text">{error}</p>
            </motion.div>
          ) : results.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-6"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2 bengali-text">
                সার্চ রেজাল্ট ({results.length})
              </h3>
              {results.map((voter, idx) => (
                <motion.div
                  key={voter.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row gap-8 items-start md:items-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User size={40} />
                  </div>
                  
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 bengali-text">নাম</div>
                      <div className="font-bold text-slate-900 bengali-text">{voter.name}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 bengali-text">পিতা</div>
                      <div className="font-bold text-slate-900 bengali-text">{voter.father}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 bengali-text">মাতা</div>
                      <div className="font-bold text-slate-900 bengali-text">{voter.mother}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 bengali-text">ভোটার নং</div>
                      <div className="font-mono font-bold text-slate-900">{voter.voter_no}</div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 bengali-text">ভোট কেন্দ্র</div>
                      <div className="font-bold text-primary bengali-text">{voter.polling_booth}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePrint(voter)}
                    className="w-full md:w-auto px-6 py-4 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shrink-0 bengali-text"
                  >
                    <Printer size={20} /> স্লিপ প্রিন্ট
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : searched ? (
             <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Search size={40} />
              </div>
              <p className="text-slate-500 font-medium bengali-text">কোন তথ্য পাওয়া যায়নি।</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VoterSearch;
