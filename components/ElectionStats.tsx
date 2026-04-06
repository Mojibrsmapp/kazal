import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ELECTION_DATA } from '../constants';
import { ELECTION_CENTERS_2026 } from '../election-centers-2026';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Trophy, Users, CheckCircle2, XCircle } from 'lucide-react';

const ElectionStats: React.FC = () => {
  const [showDetailed, setShowDetailed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCenters = ELECTION_CENTERS_2026.filter(center => 
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.id.toString().includes(searchTerm)
  );

  const stats2026 = ELECTION_DATA.find(d => d.year === '২০২৬');

  return (
    <section id="election" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            নির্বাচনী ফলাফল বিশ্লেষণ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            কক্সবাজার-৩ আসনের বিগত নির্বাচনগুলোতে প্রাপ্ত ভোট এবং জনসমর্থনের বিস্তারিত চিত্র। ২০২৬ সালের ১৩তম জাতীয় সংসদ নির্বাচনে লুৎফুর রহমান কাজল বিপুল ভোটে জয়লাভ করে সংসদ সদস্য নির্বাচিত হন।
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Summary Cards for 2026 */}
          {stats2026 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4"
              >
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">লুৎফুর রহমান (প্রাপ্ত ভোট)</p>
                  <p className="text-2xl font-bold text-gray-800">{stats2026.candidateVotes.toLocaleString('bn-BD')}</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4"
              >
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">নিকটতম প্রতিদ্বন্ধি (প্রাপ্ত ভোট)</p>
                  <p className="text-2xl font-bold text-gray-800">{stats2026.opponentVotes.toLocaleString('bn-BD')}</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4"
              >
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">মোট প্রদত্ত ভোট</p>
                  <p className="text-2xl font-bold text-gray-800">{stats2026.totalVoters.toLocaleString('bn-BD')}</p>
                </div>
              </motion.div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row border-b border-gray-100">
              <button 
                onClick={() => setShowDetailed(false)}
                className={`flex-1 py-5 font-bold text-lg transition-all ${!showDetailed ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                নির্বাচনী সারসংক্ষেপ
              </button>
              <button 
                onClick={() => setShowDetailed(true)}
                className={`flex-1 py-5 font-bold text-lg transition-all ${showDetailed ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                কেন্দ্রওয়ারী বিস্তারিত ফলাফল (২০২৬)
              </button>
            </div>

            <div className="p-6 md:p-10">
              <AnimatePresence mode="wait">
                {!showDetailed ? (
                  <motion.div 
                    key="summary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-10"
                  >
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={ELECTION_DATA}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 14}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            cursor={{fill: '#f9fafb'}}
                          />
                          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '30px' }} />
                          <Bar name="লুৎফুর রহমান কাজল (ভোট)" dataKey="candidateVotes" fill="#16a34a" radius={[6, 6, 0, 0]} barSize={40} />
                          <Bar name="প্রতিদ্বন্দ্বী (ভোট)" dataKey="opponentVotes" fill="#94a3b8" radius={[6, 6, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {ELECTION_DATA.map((data, idx) => (
                        <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-primary-200 transition-colors">
                          <div className="flex justify-between items-start mb-4">
                            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold">{data.year} নির্বাচন</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${data.result === 'জয়ী' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                              {data.result}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">প্রাপ্ত ভোট:</span>
                              <span className="font-bold text-gray-800">{data.candidateVotes.toLocaleString('bn-BD')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">মোট ভোটার:</span>
                              <span className="font-bold text-gray-800">{data.totalVoters.toLocaleString('bn-BD')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="detailed"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                      <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="কেন্দ্রের নাম বা নম্বর দিয়ে খুঁজুন..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        মোট কেন্দ্র: <span className="font-bold text-gray-800">১৮২</span> | প্রদর্শিত হচ্ছে: <span className="font-bold text-primary-600">{filteredCenters.length}</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-gray-100">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-bold border-b border-gray-100">কেন্দ্র নং</th>
                            <th className="px-6 py-4 font-bold border-b border-gray-100">কেন্দ্রের নাম</th>
                            <th className="px-6 py-4 font-bold border-b border-gray-100 text-right">লুৎফুর রহমান (ধানের শীষ)</th>
                            <th className="px-6 py-4 font-bold border-b border-gray-100 text-right">নিকটতম প্রতিদ্বন্ধি</th>
                            <th className="px-6 py-4 font-bold border-b border-gray-100 text-center">বিজয়ী</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {filteredCenters.map((center) => (
                            <tr key={center.id} className="hover:bg-gray-50 transition-colors group">
                              <td className="px-6 py-4 text-sm font-medium text-gray-500">{center.id}</td>
                              <td className="px-6 py-4 text-sm font-bold text-gray-800 group-hover:text-primary-700 transition-colors">{center.name}</td>
                              <td className="px-6 py-4 text-sm text-right font-bold text-green-600">{center.candidateVotes.toLocaleString('bn-BD')}</td>
                              <td className="px-6 py-4 text-sm text-right font-medium text-gray-600">{center.opponentVotes.toLocaleString('bn-BD')}</td>
                              <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  center.winner === 'লুৎফর রহমান' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {center.winner === 'লুৎফর রহমান' ? <CheckCircle2 size={12} className="mr-1" /> : <XCircle size={12} className="mr-1" />}
                                  {center.winner}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {filteredCenters.length === 0 && (
                      <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <Search size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">কোন কেন্দ্র খুঁজে পাওয়া যায়নি।</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectionStats;
