import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Newspaper, ExternalLink, Image as ImageIcon, Loader2, Tag, FolderOpen, Info, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import { motion } from 'motion/react';

const AddNews: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
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
      const formData = new FormData();
      formData.append('title', title);
      if (content) formData.append('content', content);
      if (externalLink) formData.append('external_link', externalLink);
      if (image) formData.append('image', image);
      if (category) formData.append('category', category);
      if (tags) formData.append('tags', tags);
      if (metaDescription) formData.append('meta_description', metaDescription);

      await axios.post('/api/news', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/admin/news');
    } catch (err) {
      console.error('Failed to create news', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/news')}
          className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Publish New News</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Post Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg font-bold"
              placeholder="Enter news title"
              required
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Featured Image</label>
                <div 
                  onClick={() => document.getElementById('news-image')?.click()}
                  className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="text-slate-300 mb-2" size={48} />
                      <p className="text-xs text-slate-400 font-bold">Click to upload image</p>
                    </>
                  )}
                </div>
                <input 
                  id="news-image"
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Category</label>
                <div className="relative">
                  <FolderOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none text-sm"
                  >
                    <option value="">Select Category</option>
                    <option value="খবর">খবর (News)</option>
                    <option value="সাক্ষাৎকার">সাক্ষাৎকার (Interview)</option>
                    <option value="প্রেস নোট">প্রেস নোট (Press Note)</option>
                    <option value="অন্যান্য">অন্যান্য (Other)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Tags</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    placeholder="tag1, tag2..."
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Meta Description (SEO)</label>
                <div className="relative">
                  <Info className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm"
                    placeholder="Brief summary for search engines..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">External News Link</label>
                <div className="relative">
                  <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="url" 
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    placeholder="https://example.com/news"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-2">If provided, internal content editor will be ignored.</p>
              </div>

              {!externalLink && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">News Content</label>
                  <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                    <ReactQuill 
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={quillModules}
                      placeholder="Write news content here..."
                      className="h-80 mb-12"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-8 border-t border-slate-50">
            <button 
              type="button"
              onClick={() => navigate('/admin/news')}
              className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-12 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Publish News Post'}
            </button>
          </div>
        </form>
      </motion.div>
    </AdminLayout>
  );
};

export default AddNews;
