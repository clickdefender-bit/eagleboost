import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  MousePointer, 
  Settings, 
  Eye, 
  TrendingUp,
  Activity,
  Zap,
  Edit3
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Live Traffic', href: '/admin/live', icon: Activity },
    { name: 'Content Editor', href: '/admin/content', icon: Edit3 },
    { name: 'Logs', href: '/admin/logs', icon: TrendingUp },
    { name: 'Integrations', href: '/admin/integrations', icon: Zap },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700">
        <div className="flex h-16 items-center justify-center border-b border-slate-700">
          <h1 className="text-xl font-bold text-blue-400">EAGLEBOOST Admin</h1>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <div className="p-8 min-h-screen bg-slate-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};