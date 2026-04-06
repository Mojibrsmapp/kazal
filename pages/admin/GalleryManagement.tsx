import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Image as ImageIcon, Video, Trash2, Loader2, Search, Filter, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GalleryManagement: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'photo' | 'video'>('photo');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('রাজনৈতিক');
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch gallery', err);
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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('url', url);
    formData.append('category', category);
    formData.append('is_featured', isFeatured ? '1' : '0');
    if (image) formData.append('image', image);

    try {
      await axios.post('/api/admin/gallery', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsModalOpen(false);
      resetForm();
      fetchGallery();
    } catch (err) {
      console.error('Failed to add gallery item', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGallery();
    } catch (err) {
      console.error('Failed to delete item', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setType('photo');
    setUrl('');
    setCategory('রাজনৈতিক');
    setIsFeatured(false);
    setImage(null);
    setImagePreview(null);
  };

  const filteredItems = items.filter(item => filter === 'all' || item.type === filter);

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('photo')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'photo' ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            Photos
          </button>
          <button 
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'video' ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            Videos
          </button>
        </div>
        <button 
          onClick={() => navigate('/admin/gallery/add')}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <motion.div 
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group relative"
          >
            <div className="aspect-square bg-slate-100 relative overflow-hidden">
              {item.type === 'photo' ? (
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-4 text-center">
                  <Video size={48} className="mb-2 text-primary" />
                  <p className="text-[10px] font-mono break-all">{item.url}</p>
                </div>
              )}
              
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[8px] font-bold rounded-full uppercase">
                  {item.category}
                </span>
              </div>

              {item.is_featured === 1 && (
                <div className="absolute top-2 right-2">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                </div>
              )}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-bold text-slate-800 truncate">{item.title || 'Untitled'}</p>
              <p className="text-[10px] text-slate-400">{new Date(item.created_at).toLocaleDateString()}</p>
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
                <h2 className="text-xl font-bold">Add Gallery Item</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title (Optional)</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    placeholder="Item title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                    <select 
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    >
                      <option value="photo">Photo</option>
                      <option value="video">Video (YouTube)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    >
                      <option value="রাজনৈতিক">রাজনৈতিক</option>
                      <option value="সামাজিক">সামাজিক</option>
                      <option value="পারিবারিক">পারিবারিক</option>
                    </select>
                  </div>
                </div>

                {type === 'photo' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Upload Photo</label>
                    <div 
                      onClick={() => document.getElementById('gallery-image')?.click()}
                      className="h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden"
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <ImageIcon className="text-slate-300 mb-1" size={24} />
                          <p className="text-[10px] text-slate-400">Click to upload</p>
                        </>
                      )}
                    </div>
                    <input 
                      id="gallery-image"
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Video ID</label>
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                      placeholder="e.g. dQw4w9WgXcQ"
                      required
                    />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                  />
                  <label htmlFor="isFeatured" className="text-xs font-bold text-slate-700 cursor-pointer">Featured in Gallery</label>
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
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Add to Gallery'}
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

export default GalleryManagement;
