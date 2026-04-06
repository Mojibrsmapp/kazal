import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { Newspaper, Users, History, TrendingUp, MessageSquare, Image as ImageIcon, Briefcase, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    news: 0,
    admins: 0,
    logs: 0,
    unreadMessages: 0,
    monthlyVisitors: 0,
    dailyVisitors: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('/api/admin/stats', config);
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { icon: <Newspaper size={24} />, label: 'Total News', value: stats.news, color: 'bg-blue-500' },
    { icon: <Users size={24} />, label: 'Admins', value: stats.admins, color: 'bg-green-500' },
    { icon: <MessageSquare size={24} />, label: 'Unread Messages', value: stats.unreadMessages, color: 'bg-red-500' },
    { icon: <TrendingUp size={24} />, label: 'Daily Visitors', value: stats.dailyVisitors, color: 'bg-orange-500' },
  ];

  const quickActions = [
    { label: 'Add News', desc: 'Post a new update', icon: <PlusCircle size={20} />, path: '/admin/news' },
    { label: 'Upload Gallery', desc: 'Add photos/videos', icon: <ImageIcon size={20} />, path: '/admin/gallery' },
    { label: 'Manage Plans', desc: 'Development projects', icon: <Briefcase size={20} />, path: '/admin/plans' },
    { label: 'View Messages', desc: 'Contact submissions', icon: <MessageSquare size={20} />, path: '/admin/messages' },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center"
          >
            <div className={`${card.color} p-4 rounded-xl text-white mr-4 shadow-lg`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold text-slate-800">{isLoading ? '...' : card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button 
                key={action.label}
                onClick={() => navigate(action.path)}
                className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-white transition-all text-left group flex items-start gap-3"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400 group-hover:text-primary transition-colors">
                  {action.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800 group-hover:text-primary">{action.label}</p>
                  <p className="text-xs text-slate-500">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Database (Turso)</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">SMS API (Anbu)</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Image Server (Telegram)</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Online</span>
            </div>
            <div className="pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Monthly Visitors</span>
                <span className="font-bold text-slate-600">{stats.monthlyVisitors}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
