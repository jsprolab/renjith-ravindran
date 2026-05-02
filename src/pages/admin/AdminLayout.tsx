import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineDashboard,
} from 'react-icons/ai';

interface AdminLayoutProps {
  children: React.ReactNode;
  adminUser: { username: string; role: string } | null;
}

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <AiOutlineDashboard className="h-4 w-4" /> },
  { label: 'Contacts', path: '/admin/dashboard', icon: <AiOutlineMail className="h-4 w-4" /> },
  { label: 'Settings', path: '/admin/settings', icon: <AiOutlineSetting className="h-4 w-4" /> },
];

export const AdminLayout = ({ children, adminUser }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-gray-900 text-white shadow-lg z-30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
              onClick={() => navigate('/admin/dashboard')}
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
                RR
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Renjith Ravindran</p>
                <p className="text-xs text-gray-400 leading-tight">Admin Panel</p>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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

            {/* Right Side — User info + Logout */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="h-7 w-7 rounded-full bg-gray-700 flex items-center justify-center">
                  <AiOutlineUser className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-white leading-tight">{adminUser?.username}</p>
                  <p className="text-xs text-gray-400 leading-tight capitalize">{adminUser?.role?.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="h-5 w-px bg-gray-600" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-red-600 rounded-md transition-colors"
              >
                <AiOutlineLogout className="h-4 w-4" />
                Logout
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <AiOutlineClose className="h-5 w-5" /> : <AiOutlineMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-700 bg-gray-900 px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
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
            <div className="pt-2 border-t border-gray-700 mt-2">
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400">
                <AiOutlineUser className="h-4 w-4" />
                <span>{adminUser?.username}</span>
                <span className="text-gray-600">·</span>
                <span className="capitalize">{adminUser?.role?.replace('_', ' ')}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
              >
                <AiOutlineLogout className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};
