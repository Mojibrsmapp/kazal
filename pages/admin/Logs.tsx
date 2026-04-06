import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { History, User, Activity, Clock, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(response.data);
    } catch (err) {
      console.error('Failed to fetch logs', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionColor = (action: string) => {
    switch (action) {
      case 'LOGIN': return 'bg-blue-100 text-blue-700';
      case 'CREATE_NEWS': return 'bg-green-100 text-green-700';
      case 'ADD_ADMIN': return 'bg-purple-100 text-purple-700';
      case 'OTP_REQUEST': return 'bg-orange-100 text-orange-700';
      case 'PASSWORD_RESET': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Filter size={16} />
            <span>Filter by Action</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="animate-spin" size={20} />
                      Loading logs...
                    </div>
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    No logs found matching your search.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          <User size={16} />
                        </div>
                        <span className="font-bold text-slate-800 text-sm">@{log.username || 'System'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 max-w-md truncate" title={log.details}>
                        {log.details}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock size={12} />
                        {new Date(log.created_at).toLocaleString()}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Logs;
