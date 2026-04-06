import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  History, 
  LogOut, 
  Menu, 
  X,
  User as UserIcon,
  Image as ImageIcon,
  Briefcase,
  MessageSquare,
  Settings,
  Bell,
  TrendingUp
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    const token = localStorage.getItem('token');
    if (!storedAdmin || !token) {
      navigate('/admin/login');
    } else {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const getMenuItems = () => {
    if (!admin) return [];
    
    const perms = admin.permissions ? JSON.parse(admin.permissions) : {};
    const isPrimary = admin.is_primary;

    const items = [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin', show: true },
      { icon: <TrendingUp size={20} />, label: 'Analytics', path: '/admin/analytics', show: true },
      { icon: <Newspaper size={20} />, label: 'News Management', path: '/admin/news', show: isPrimary || perms.add_news },
      { icon: <ImageIcon size={20} />, label: 'Gallery', path: '/admin/gallery', show: true },
      { icon: <Briefcase size={20} />, label: 'Development Plans', path: '/admin/plans', show: true },
      { icon: <MessageSquare size={20} />, label: 'Messages', path: '/admin/messages', show: true },
      { icon: <Bell size={20} />, label: 'Notices', path: '/admin/notices', show: true },
      { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings', show: isPrimary },
      { icon: <Users size={20} />, label: 'Admins', path: '/admin/users', show: isPrimary || perms.add_admin },
      { icon: <History size={20} />, label: 'Logs', path: '/admin/logs', show: isPrimary || perms.view_logs },
      { icon: <UserIcon size={20} />, label: 'Profile', path: '/admin/profile', show: true },
    ];

    return items.filter(item => item.show);
  };

  const menuItems = getMenuItems();

  if (!admin) return null;

  return (
    <div className="flex h-screen bg-gray-100 font-sans w-full overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col z-50 shrink-0`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">Admin Panel</span>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-800 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-4 hover:bg-slate-800 transition-colors ${
                location.pathname === item.path ? 'bg-primary/20 border-l-4 border-primary' : ''
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && <span className="ml-4 truncate">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link to="/admin/profile" className="flex items-center mb-4 hover:bg-slate-800 p-2 rounded transition-colors group">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 overflow-hidden border border-slate-700 group-hover:border-primary/50">
              {admin.avatar ? (
                <img src={admin.avatar} alt={admin.username} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={20} className="text-primary" />
              )}
            </div>
            {isSidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate text-sm">{admin.full_name}</p>
                <p className="text-[10px] text-slate-400 truncate">@{admin.username}</p>
              </div>
            )}
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-2 hover:bg-red-500/10 text-red-400 hover:text-red-500 rounded transition-colors"
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto bg-slate-50">
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-40">
          <h1 className="text-xl font-bold text-slate-800">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 font-medium">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </header>
        <div className="w-full">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
