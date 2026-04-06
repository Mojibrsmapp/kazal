import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Briefcase, Trash2, Loader2, Search, Filter, CheckCircle, Clock, MapPin, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DevelopmentPlans: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPlan, setEditingPlan] = useState<any>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Road');
  const [status, setStatus] = useState('Running');
  const [area, setArea] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/plans');
      setPlans(response.data);
    } catch (err) {
      console.error('Failed to fetch plans', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      if (editingPlan) {
        await axios.put(`/api/admin/plans/${editingPlan.id}`, {
          title, description, type, status, area
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('status', status);
        formData.append('area', area);
        if (image) formData.append('image', image);

        await axios.post('/api/admin/plans', formData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      setIsModalOpen(false);
      resetForm();
      fetchPlans();
    } catch (err) {
      console.error('Failed to save plan', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (plan: any) => {
    setEditingPlan(plan);
    setTitle(plan.title);
    setDescription(plan.description || '');
    setType(plan.type);
    setStatus(plan.status);
    setArea(plan.area || '');
    setImagePreview(plan.image_url || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this plan?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPlans();
    } catch (err) {
      console.error('Failed to delete plan', err);
    }
  };

  const resetForm = () => {
    setEditingPlan(null);
    setTitle('');
    setDescription('');
    setType('Road');
    setStatus('Running');
    setArea('');
    setImage(null);
    setImagePreview(null);
  };

  const filteredPlans = plans.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.area?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search projects or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="h-40 bg-slate-100 relative overflow-hidden">
              {plan.image_url ? (
                <img src={plan.image_url} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Briefcase size={48} />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(plan)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase flex items-center gap-1 ${plan.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                  {plan.status === 'Completed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                  {plan.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">
                  {plan.type}
                </span>
                {plan.area && (
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <MapPin size={10} /> {plan.area}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-800 line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                {plan.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                {plan.description}
              </p>
              <div className="text-[10px] text-slate-400 font-medium">
                Updated: {new Date(plan.updated_at).toLocaleDateString()}
              </div>
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
                <h2 className="text-xl font-bold">{editingPlan ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-1 hover:bg-white/20 rounded-lg">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    placeholder="e.g. New Road Construction"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                    <select 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    >
                      <option value="Road">Road</option>
                      <option value="School">School</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Bridge">Bridge</option>
                      <option value="Mosque">Mosque</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                    <select 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    >
                      <option value="Running">Running</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Area / Location</label>
                  <input 
                    type="text" 
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    placeholder="e.g. Cox's Bazar Sadar"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm resize-none"
                    placeholder="Project details..."
                  />
                </div>

                {!editingPlan && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Project Image (Optional)</label>
                    <div 
                      onClick={() => document.getElementById('plan-image')?.click()}
                      className="h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden"
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Briefcase className="text-slate-300 mb-1" size={24} />
                          <p className="text-[10px] text-slate-400">Click to upload</p>
                        </>
                      )}
                    </div>
                    <input 
                      id="plan-image"
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => { setIsModalOpen(false); resetForm(); }}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-2 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-sm"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : (editingPlan ? 'Update Project' : 'Create Project')}
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

export default DevelopmentPlans;
