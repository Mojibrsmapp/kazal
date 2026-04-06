import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Bell, Trash2, Loader2, Search, Calendar, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AdminNotices: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('notice');
  const [isActive, setIsActive] = useState(true);
  const [expiresAt, setExpiresAt] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/notices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotices(response.data);
    } catch (err) {
      console.error('Failed to fetch notices', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/admin/notices', {
        title, content, type, is_active: isActive, expires_at: expiresAt
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsModalOpen(false);
      resetForm();
      fetchNotices();
    } catch (err) {
      console.error('Failed to add notice', err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleStatus = async (id: number, currentStatus: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/admin/notices/${id}`, { is_active: !currentStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotices();
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this notice?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/notices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotices();
    } catch (err) {
      console.error('Failed to delete notice', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setType('notice');
    setIsActive(true);
    setExpiresAt('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="text-red-500" size={20} />;
      case 'popup': return <Bell className="text-primary" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Notices & Announcements</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Add Notice
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {notices.map((notice) => (
          <motion.div 
            key={notice.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white p-6 rounded-2xl shadow-sm border ${notice.is_active ? 'border-slate-100' : 'border-slate-200 opacity-60'} flex flex-col md:flex-row gap-6 items-start md:items-center`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              notice.type === 'alert' ? 'bg-red-50' : 
              notice.type === 'popup' ? 'bg-primary/10' : 'bg-blue-50'
            }`}>
              {getTypeIcon(notice.type)}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800">{notice.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${
                  notice.type === 'alert' ? 'bg-red-500 text-white' : 
                  notice.type === 'popup' ? 'bg-primary text-white' : 'bg-blue-500 text-white'
                }`}>
                  {notice.type}
                </span>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2">{notice.content}</p>
              <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(notice.created_at).toLocaleDateString()}</span>
                {notice.expires_at && (
                  <span className="flex items-center gap-1 text-orange-400">
                    <Calendar size={12} /> Expires: {new Date(notice.expires_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => toggleStatus(notice.id, notice.is_active)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  notice.is_active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {notice.is_active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                {notice.is_active ? 'Active' : 'Inactive'}
              </button>
              <button 
                onClick={() => handleDelete(notice.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-primary text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">Add Notice</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Notice Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                  >
                    <option value="notice">General Notice</option>
                    <option value="alert">Urgent Alert</option>
                    <option value="popup">Popup Banner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Content</label>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Expiry Date (Optional)</label>
                  <input 
                    type="date" 
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                  />
                  <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer">Active Immediately</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex-2 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-sm"
                  >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'Publish Notice'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminNotices;
