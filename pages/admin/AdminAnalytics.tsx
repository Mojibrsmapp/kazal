import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer2, 
  Search, 
  Globe, 
  Loader2, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';

const AdminAnalytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [scData, setScData] = useState<any>(null);
  const [gaData, setGaData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    fetchSearchConsole();
    fetchGoogleAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (err) {
      console.error('Failed to fetch analytics', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchConsole = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/search-console', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScData(response.data);
    } catch (err) {
      console.error('Failed to fetch Search Console data', err);
    }
  };

  const fetchGoogleAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/google-analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGaData(response.data);
    } catch (err) {
      console.error('Failed to fetch Google Analytics data', err);
    }
  };

  if (isLoading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    </AdminLayout>
  );

  const avgCtr = scData?.rows?.length 
    ? (scData.rows.reduce((acc: number, row: any) => acc + row.ctr, 0) / scData.rows.length * 100).toFixed(2) + '%'
    : data?.ga_data?.ctr || '0%';

  // Extract GA4 metrics if available
  const gaMetrics = gaData?.report?.rows?.reduce((acc: any, row: any) => {
    acc.activeUsers += parseInt(row.metricValues[0].value);
    acc.sessions += parseInt(row.metricValues[1].value);
    acc.pageViews += parseInt(row.metricValues[2].value);
    return acc;
  }, { activeUsers: 0, sessions: 0, pageViews: 0 }) || null;

  const stats = [
    { label: 'Total Page Views', value: gaMetrics?.pageViews || data?.total_views || 0, icon: <Eye size={20} />, color: 'bg-blue-500', change: '+12%', trend: 'up' },
    { label: 'Unique Visitors', value: gaMetrics?.activeUsers || data?.unique_visitors || 0, icon: <Users size={20} />, color: 'bg-primary', change: '+5%', trend: 'up' },
    { label: 'Real-time Users', value: gaData?.realtime?.rows?.[0]?.metricValues?.[0]?.value || 0, icon: <TrendingUp size={20} />, color: 'bg-green-500', change: 'Live', trend: 'up' },
    { label: 'Avg. CTR', value: avgCtr, icon: <MousePointer2 size={20} />, color: 'bg-orange-500', change: '-2%', trend: 'down' },
  ];

  // Prepare chart data from GA4
  const chartData = gaData?.report?.rows?.map((row: any) => ({
    name: row.dimensionValues[0].value.slice(6, 8) + '/' + row.dimensionValues[0].value.slice(4, 6),
    views: parseInt(row.metricValues[2].value)
  })).reverse() || [
    { name: 'Mon', views: 400 },
    { name: 'Tue', views: 300 },
    { name: 'Wed', views: 500 },
    { name: 'Thu', views: 280 },
    { name: 'Fri', views: 590 },
    { name: 'Sat', views: 800 },
    { name: 'Sun', views: 600 },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-800">{stat.value.toLocaleString()}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Popular Pages */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Popular Pages</h2>
          </div>
          <div className="space-y-4">
            {data?.popular_pages?.map((page: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 bg-white text-slate-400 text-[10px] font-bold rounded-lg flex items-center justify-center border border-slate-200">{idx + 1}</span>
                  <span className="text-sm text-slate-700 font-medium truncate">{page.path}</span>
                </div>
                <span className="text-xs font-bold text-primary">{page.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search Keywords */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <Search className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Top Search Keywords</h2>
          </div>
          <div className="space-y-4">
            {(scData?.rows || data?.ga_data?.keywords)?.map((kw: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <span className="text-sm text-slate-700 font-medium">{kw.keys?.[0] || kw.term}</span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Clicks</p>
                    <p className="text-xs font-bold text-slate-800">{kw.clicks}</p>
                  </div>
                  <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${Math.min((kw.clicks / 500) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>
            ))}
            {!scData?.rows && !data?.ga_data?.keywords && (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm">No keyword data available</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Traffic Source Chart Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="text-primary" size={24} />
          <h2 className="text-xl font-bold text-slate-800">Traffic Overview</h2>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#059669' }}
              />
              <Area type="monotone" dataKey="views" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
