import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { User, Mail, Lock, Shield, Loader2, ArrowLeft, Save, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

const AddAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Editor');
  const [permissions, setPermissions] = useState({
    add_news: true,
    edit_news: false,
    add_admin: false,
    view_logs: false,
    manage_gallery: true,
    manage_plans: true
  });

  const handlePermissionToggle = (key: string) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('/api/admin/register', {
        name,
        email,
        password,
        role,
        permissions: JSON.stringify(permissions)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/admin/users');
    } catch (err) {
      console.error('Failed to register admin', err);
      alert('Failed to register admin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/users')}
          className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Register New Admin</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-bold"
                    placeholder="Enter admin name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-bold"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-bold"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Role</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none text-sm font-bold"
                >
                  <option value="Editor">Editor</option>
                  <option value="Manager">Manager</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-50">
              <button 
                type="button"
                onClick={() => navigate('/admin/users')}
                className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-12 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Register Admin
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden h-fit"
        >
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Shield size={18} className="text-primary" />
              Permissions
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Define access level</p>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(permissions).map(([key, value]) => (
              <div 
                key={key}
                onClick={() => handlePermissionToggle(key)}
                className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                  value ? 'border-primary bg-primary/5 text-primary' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider">{key.replace('_', ' ')}</span>
                {value ? <CheckCircle size={18} /> : <XCircle size={18} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AddAdmin;
