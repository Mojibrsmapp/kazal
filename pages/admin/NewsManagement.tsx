import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Newspaper, ExternalLink, Image as ImageIcon, Trash2, Loader2, Search, Tag, FolderOpen, Info, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactQuill from 'react-quill';

const NewsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNews, setEditingNews] = useState<any>(null);
  
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

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/news');
      setNewsList(response.data);
    } catch (err) {
      console.error('Failed to fetch news', err);
    }
  };

  const handleEdit = (news: any) => {
    setEditingNews(news);
    setTitle(news.title);
    setContent(news.content || '');
    setExternalLink(news.external_link || '');
    setImagePreview(news.image_url || null);
    setCategory(news.category || '');
    setTags(news.tags || '');
    setMetaDescription(news.meta_description || '');
    setIsModalOpen(true);
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

      if (editingNews) {
        // Update existing news
        await axios.put(`/api/news/${editingNews.id}`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Add new news
        await axios.post('/api/news', formData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      setIsModalOpen(false);
      resetForm();
      fetchNews();
    } catch (err) {
      console.error('Failed to save news', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingNews(null);
    setTitle('');
    setContent('');
    setExternalLink('');
    setImage(null);
    setImagePreview(null);
    setCategory('');
    setTags('');
    setMetaDescription('');
  };

  const filteredNews = newsList.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <button 
          onClick={() => navigate('/admin/news/add')}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Add News
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <motion.div 
            key={news.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="h-48 bg-slate-100 relative overflow-hidden">
              {news.image_url ? (
                <img src={news.image_url} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Newspaper size={48} />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(news)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                >
                  <Edit size={16} />
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {news.external_link ? (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1 uppercase">
                    <ExternalLink size={10} /> External
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full flex items-center gap-1 uppercase">
                    <Newspaper size={10} /> Internal
                  </span>
                )}
                <span className="text-[10px] text-slate-400 font-medium">
                  {new Date(news.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {news.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                {news.content || news.external_link}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400">/{news.slug}</span>
                <button className="text-xs font-bold text-primary hover:underline">View Post</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add News Modal */}
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
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-primary text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingNews ? 'Edit News Post' : 'Add New Post'}</h2>
                <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-1 hover:bg-white/20 rounded-lg">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Post Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter news title"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Featured Image</label>
                      <div 
                        onClick={() => document.getElementById('news-image')?.click()}
                        className="h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden"
                      >
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <ImageIcon className="text-slate-300 mb-2" size={32} />
                            <p className="text-xs text-slate-400">Click to upload image</p>
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
                      <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                      <div className="relative">
                        <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
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
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tags (Comma separated)</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="text" 
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="tag1, tag2, tag3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Meta Description (SEO)</label>
                      <div className="relative">
                        <Info className="absolute left-3 top-3 text-slate-400" size={16} />
                        <textarea 
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          rows={3}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                          placeholder="Brief summary for search engines..."
                        />
                      </div>
                    </div>

                    {!content && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">External News Link</label>
                        <div className="relative">
                          <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input 
                            type="url" 
                            value={externalLink}
                            onChange={(e) => setExternalLink(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="https://example.com/news"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">If provided, internal content will be hidden.</p>
                      </div>
                    )}
                  </div>
                </div>

                {!externalLink && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">News Content</label>
                    <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                      <ReactQuill 
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={quillModules}
                        placeholder="Write news content here..."
                        className="h-64 mb-12"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Rich text editor supports bold, headings, images, and links.</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-2 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (editingNews ? 'Update News' : 'Publish News')}
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

export default NewsManagement;
