import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Image as ImageIcon, Video, Loader2, ArrowLeft, Save, Star, FolderOpen, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';

const AddGallery: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('photo');
  const [category, setCategory] = useState('রাজনৈতিক');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

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
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('category', category);
      formData.append('is_featured', isFeatured ? '1' : '0');
      
      if (type === 'photo' && image) {
        formData.append('image', image);
      } else if (type === 'video') {
        formData.append('url', videoUrl);
      }

      await axios.post('/api/gallery', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/admin/gallery');
    } catch (err) {
      console.error('Failed to add to gallery', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/gallery')}
          className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Add to Gallery</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Media Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setType('photo')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                    type === 'photo' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <ImageIcon size={18} /> Photo
                </button>
                <button 
                  type="button"
                  onClick={() => setType('video')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                    type === 'video' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <Video size={18} /> Video
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Category</label>
              <div className="relative">
                <FolderOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none text-sm font-bold"
                >
                  <option value="রাজনৈতিক">রাজনৈতিক (Political)</option>
                  <option value="সামাজিক">সামাজিক (Social)</option>
                  <option value="পারিবারিক">পারিবারিক (Family)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Title / Caption</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-bold"
              placeholder="Enter media title"
              required
            />
          </div>

          {type === 'photo' ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Upload Photo</label>
              <div 
                onClick={() => document.getElementById('gallery-image')?.click()}
                className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon className="text-slate-300 mb-2" size={48} />
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Click to upload photo</p>
                  </>
                )}
              </div>
              <input 
                id="gallery-image"
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required={type === 'photo'}
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">YouTube Video ID / URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                  placeholder="e.g. dQw4w9WgXcQ or full URL"
                  required={type === 'video'}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Enter the YouTube video ID or the full URL.</p>
            </div>
          )}

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
            <input 
              type="checkbox" 
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-5 h-5 text-primary rounded-lg border-slate-300 focus:ring-primary"
            />
            <label htmlFor="isFeatured" className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
              <Star size={16} className={isFeatured ? 'text-yellow-500 fill-yellow-500' : 'text-slate-400'} />
              Mark as Featured
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button 
              type="button"
              onClick={() => navigate('/admin/gallery')}
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
              Save Media
            </button>
          </div>
        </form>
      </motion.div>
    </AdminLayout>
  );
};

export default AddGallery;
