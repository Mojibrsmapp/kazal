import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { User, Mail, Phone, Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const Profile: React.FC = () => {
  const [admin, setAdmin] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      const parsed = JSON.parse(storedAdmin);
      setAdmin(parsed);
      setFullName(parsed.full_name);
      setEmail(parsed.email || '');
      setAvatarPreview(parsed.avatar || null);
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);

    try {
      const response = await axios.patch('/api/admin/profile', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        const updatedAdmin = response.data.admin;
        setAdmin(updatedAdmin);
        localStorage.setItem('admin', JSON.stringify(updatedAdmin));
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        // Refresh the page to update the sidebar avatar
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err: any) {
      console.error('Failed to update profile', err);
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to update profile' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!admin) return null;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="h-32 bg-gradient-to-r from-primary to-primary-light relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={48} className="text-slate-300" />
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  className="absolute bottom-2 right-2 p-2 bg-white text-primary rounded-xl shadow-lg hover:bg-primary hover:text-white transition-all"
                >
                  <Camera size={18} />
                </button>
                <input 
                  id="avatar-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800">{admin.full_name}</h2>
              <p className="text-slate-500">@{admin.username} • {admin.is_primary ? 'Primary Admin' : 'Administrator'}</p>
            </div>

            {message && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
                  message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                }`}
              >
                {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span className="font-medium">{message.text}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2 opacity-60">
                  <label className="text-sm font-bold text-slate-700 ml-1">Username (Read-only)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={admin.username}
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2 opacity-60">
                  <label className="text-sm font-bold text-slate-700 ml-1">Phone Number (Read-only)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={admin.phone}
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
