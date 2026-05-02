import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';

interface AdminLayoutProps {
  children: React.ReactNode;
  adminUser: { username: string; role: string } | null;
}

export const AdminLayout = ({ children, adminUser }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const navItems = [
    { label: 'Contacts', path: '/admin/dashboard', icon: <AiOutlineMail className="h-5 w-5" /> },
    { label: 'Settings', path: '/admin/settings', icon: <AiOutlineSetting className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="px-6 py-5 border-b border-gray-700">
        <p className="text-lg font-bold">Admin Panel</p>
        <p className="text-xs text-gray-400 mt-1">{adminUser?.username} · {adminUser?.role}</p>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => { navigate(item.path); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive(item.path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <AiOutlineLogout className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
          <span className="font-bold">Admin Panel</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <AiOutlineClose className="h-6 w-6" /> : <AiOutlineMenu className="h-6 w-6" />}
          </button>
        </div>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
