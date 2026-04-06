import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { UserPlus, User, Phone, Mail, Shield, ShieldCheck, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AdminManagement: React.FC = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [role, setRole] = useState('Editor');
  const [isPrimary, setIsPrimary] = useState(false);
  const [permissions, setPermissions] = useState({
    view_logs: false,
    add_news: true,
    edit_others_news: false,
    add_admin: false,
    view_status: true
  });

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) setCurrentUser(JSON.parse(storedAdmin));
    fetchAdmins();
  }, []);

  const handlePermissionChange = (key: string) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmins(response.data);
    } catch (err) {
      console.error('Failed to fetch admins', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('full_name', fullName);
    formData.append('role', role);
    formData.append('is_primary', isPrimary ? '1' : '0');
    formData.append('permissions', JSON.stringify(permissions));
    if (avatar) formData.append('avatar', avatar);

    try {
      await axios.post('/api/admin/add', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsModalOpen(false);
      resetForm();
      fetchAdmins();
    } catch (err) {
      console.error('Failed to add admin', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePermissions = async (adminId: number, newRole: string, newPerms: any, newIsPrimary: boolean) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/admin/${adminId}/permissions`, {
        role: newRole,
        permissions: newPerms,
        is_primary: newIsPrimary
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdmins();
    } catch (err) {
      console.error('Failed to update permissions', err);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to remove this administrator?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdmins();
    } catch (err) {
      console.error('Failed to delete admin', err);
    }
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setPhone('');
    setEmail('');
    setFullName('');
    setAvatar(null);
    setAvatarPreview(null);
    setRole('Editor');
    setIsPrimary(false);
    setPermissions({
      view_logs: false,
      add_news: true,
      edit_others_news: false,
      add_admin: false,
      view_status: true
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-bold text-slate-800">System Administrators</h2>
        {currentUser?.is_primary && (
          <button 
            onClick={() => navigate('/admin/users/add')}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
          >
            <UserPlus size={20} /> Add Admin
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <motion.div 
            key={admin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group"
          >
            {admin.is_primary ? (
              <div className="absolute top-0 right-0 p-2 bg-primary text-white rounded-bl-xl shadow-lg">
                <ShieldCheck size={16} />
              </div>
            ) : (
              <div className="absolute top-0 right-0 p-2 bg-slate-100 text-slate-400 rounded-bl-xl">
                <Shield size={16} />
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-50 group-hover:border-primary/20 transition-all">
                {admin.avatar ? (
                  <img src={admin.avatar} alt={admin.username} className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-slate-300" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{admin.full_name}</h3>
                <p className="text-xs text-slate-500">@{admin.username}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={14} className="text-primary" />
                <span>{admin.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={14} className="text-primary" />
                <span>{admin.email || 'No email provided'}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full w-fit ${admin.is_primary ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                  {admin.is_primary ? 'Primary Admin' : admin.role || 'Admin'}
                </span>
                {!admin.is_primary && (
                  <p className="text-[8px] text-slate-400 font-mono">
                    {admin.permissions ? Object.keys(JSON.parse(admin.permissions)).filter(k => JSON.parse(admin.permissions)[k]).join(', ') : 'No special permissions'}
                  </p>
                )}
              </div>
              {currentUser?.is_primary && !admin.is_primary && (
                <button 
                  onClick={() => handleDelete(admin.id)}
                  className="text-xs font-bold text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Admin Modal */}
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
                <h2 className="text-xl font-bold">Add New Admin</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                      placeholder="johndoe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    placeholder="017XXXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Moderator">Moderator</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isPrimary}
                        onChange={(e) => setIsPrimary(e.target.checked)}
                        className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                      />
                      <span className="text-xs font-bold text-slate-700">Primary Admin</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Permissions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(permissions).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all">
                        <input 
                          type="checkbox" 
                          checked={value}
                          onChange={() => handlePermissionChange(key)}
                          className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                        />
                        <span className="text-[10px] font-medium text-slate-600 capitalize">{key.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Avatar Image (Optional)</label>
                  <div 
                    onClick={() => document.getElementById('admin-avatar')?.click()}
                    className="h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden"
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImageIcon className="text-slate-300 mb-1" size={24} />
                        <p className="text-[10px] text-slate-400">Click to upload</p>
                      </>
                    )}
                  </div>
                  <input 
                    id="admin-avatar"
                    type="file" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
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
                    disabled={isLoading}
                    className="flex-2 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-sm"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Create Admin'}
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

export default AdminManagement;
