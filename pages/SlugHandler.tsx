import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import NewsDetail from './NewsDetail';
import PublicProfile from './PublicProfile';

const SlugHandler: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [type, setType] = useState<'news' | 'admin' | 'none' | 'loading'>('loading');

  useEffect(() => {
    const checkSlug = async () => {
      setType('loading');
      try {
        // Try news first
        const newsRes = await axios.get(`/api/news/${slug}`);
        if (newsRes.data) {
          setType('news');
          return;
        }
      } catch (err) {
        // If news fails, try admin
        try {
          const adminRes = await axios.get(`/api/public/admin/${slug}`);
          if (adminRes.data) {
            setType('admin');
            return;
          }
        } catch (adminErr) {
          setType('none');
        }
      }
    };
    checkSlug();
  }, [slug]);

  if (type === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (type === 'news') {
    return <NewsDetail />;
  }

  if (type === 'admin') {
    return <PublicProfile />;
  }

  return <Navigate to="/" replace />;
};

export default SlugHandler;
