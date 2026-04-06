import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { Save, Globe, Share2, Layout, Image as ImageIcon, Loader2, Key, Bell } from 'lucide-react';
import { motion } from 'motion/react';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setSettings(response.data);
      if (response.data.site_logo) setLogoPreview(response.data.site_logo);
    } catch (err) {
      console.error('Failed to fetch settings', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem('token');

    try {
      // Save general settings
      await axios.post('/api/admin/settings', settings, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Save logo if changed
      if (logoFile) {
        const formData = new FormData();
        formData.append('logo', logoFile);
        await axios.post('/api/admin/settings/logo', formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to save settings', err);
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <form onSubmit={handleSave} className="max-w-4xl space-y-8">
        {/* General Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-50 flex items-center gap-3">
            <Globe className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-slate-800">General Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Site Name</label>
                <input 
                  type="text" 
                  value={settings.site_name || ''}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="text-slate-300" size={24} />
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Change Logo
                  </button>
                  <input 
                    id="logo-upload"
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-50 flex items-center gap-3">
            <Share2 className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Social Links</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Facebook URL</label>
                <input 
                  type="url" 
                  value={settings.facebook_url || ''}
                  onChange={(e) => handleChange('facebook_url', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">YouTube URL</label>
                <input 
                  type="url" 
                  value={settings.youtube_url || ''}
                  onChange={(e) => handleChange('youtube_url', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-50 flex items-center gap-3">
            <Layout className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Footer Content</h2>
          </div>
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Footer Text</label>
            <textarea 
              value={settings.footer_text || ''}
              onChange={(e) => handleChange('footer_text', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>
        </motion.div>

        {/* Google Analytics Configuration */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-50 flex items-center gap-3">
            <Key className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Google Analytics API</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-500 mb-4">
              Paste your Google Service Account JSON key content below to enable Google Analytics integration.
            </p>
            <textarea 
              value={settings.google_analytics_config || ''}
              onChange={(e) => handleChange('google_analytics_config', e.target.value)}
              rows={6}
              placeholder='{ "type": "service_account", ... }'
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">GA View ID / Property ID</label>
              <input 
                type="text" 
                value={settings.google_analytics_view_id || ''}
                onChange={(e) => handleChange('google_analytics_view_id', e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save All Settings
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminSettings;
