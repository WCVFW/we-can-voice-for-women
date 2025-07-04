// File: src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Image,
  CalendarDays,
  DollarSign,
  Users,
  Settings,
  LogOut,
  UserSquare, // ← NEW for About
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      name: 'Dashboard',
      href: '/admin',
    },
    {
      icon: <Image className="h-5 w-5" />,
      name: 'Content & Media',
      href: '/admin/content',
    },
    {
      icon: <CalendarDays className="h-5 w-5" />,
      name: 'Events',
      href: '/admin/events',
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      name: 'Donations',
      href: '/admin/donations',
    },
    {
      icon: <Users className="h-5 w-5" />,
      name: 'Users',
      href: '/admin/users',
    },
    {
      icon: <UserSquare className="h-5 w-5" />, // ← About Page Icon
      name: 'About Page',
      href: '/admin/about',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      name: 'Settings',
      href: '/admin/settings',
    },
  ];

  const isActive = (path: string): boolean => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Admin Panel
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
