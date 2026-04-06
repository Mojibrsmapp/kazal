import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { MessageSquare, Trash2, Loader2, Search, Mail, Phone, Calendar, CheckCircle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/admin/messages/${id}/status`, { status: 'read' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1"><div className="w-2 h-2 bg-primary rounded-full" /> Unread</span>
          <span className="flex items-center gap-1 ml-4"><div className="w-2 h-2 bg-slate-200 rounded-full" /> Read</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Sender</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Subject</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMessages.map((msg) => (
                <tr 
                  key={msg.id} 
                  className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${msg.status === 'unread' ? 'font-bold' : ''}`}
                  onClick={() => { setSelectedMessage(msg); if (msg.status === 'unread') handleMarkAsRead(msg.id); }}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-800">{msg.name}</span>
                      <span className="text-[10px] text-slate-400">{msg.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 line-clamp-1">{msg.subject || 'No Subject'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-400">{new Date(msg.created_at).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase ${msg.status === 'unread' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMessages.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No messages found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Message Details</h2>
                    <p className="text-[10px] text-slate-400">Received on {new Date(selectedMessage.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                  <Trash2 className="rotate-45" size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Sender</p>
                    <p className="text-sm font-bold text-slate-800">{selectedMessage.name}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Phone</p>
                    <p className="text-sm font-bold text-slate-800">{selectedMessage.phone || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Email</p>
                    <p className="text-sm font-bold text-slate-800">{selectedMessage.email || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Type</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${selectedMessage.type === 'Volunteer' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                      {selectedMessage.type || 'Message'}
                    </span>
                  </div>
                </div>

                {selectedMessage.type === 'Volunteer' && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Age</p>
                      <p className="text-sm font-bold text-slate-800">{selectedMessage.age || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Area</p>
                      <p className="text-sm font-bold text-slate-800">{selectedMessage.area || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Designation</p>
                      <p className="text-sm font-bold text-slate-800">{selectedMessage.designation || 'N/A'}</p>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Subject</p>
                  <p className="text-sm font-bold text-slate-800">{selectedMessage.subject || 'No Subject'}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Message</p>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
                >
                  Close Message
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default Messages;
