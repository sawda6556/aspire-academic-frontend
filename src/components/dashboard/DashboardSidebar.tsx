'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardSidebarProps {
  userType: 'PARENT' | 'STUDENT' | 'TUTOR';
}

export default function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname();

  const commonItems: SidebarItem[] = [
    { label: 'Dashboard', href: `/${userType.toLowerCase()}/dashboard`, icon: '🏠' },
    { label: 'Lessons', href: `/${userType.toLowerCase()}/lessons`, icon: '📅' },
    { label: 'Messages', href: `/${userType.toLowerCase()}/dashboard/messages`, icon: '💬' },
  ];

  const parentItems: SidebarItem[] = [
    { label: 'Children', href: '/parent/children', icon: '👥' },
  ];

  const studentItems: SidebarItem[] = [
    { label: 'Resources', href: '/student/resources', icon: '📚' },
  ];

  const tutorItems: SidebarItem[] = [
    { label: 'Schedule', href: '/tutor/schedule', icon: '⏰' },
    { label: 'Resources', href: '/tutor/resources', icon: '📂' },
  ];

  const bottomItems: SidebarItem[] = [
    { label: 'Profile', href: `/${userType.toLowerCase()}/profile`, icon: '👤' },
    { label: 'Settings', href: `/${userType.toLowerCase()}/settings`, icon: '⚙️' },
    { label: 'Help', href: '/help', icon: '❓' },
  ];

  const menuItems = [
    ...commonItems,
    ...(userType === 'PARENT' ? parentItems : userType === 'STUDENT' ? studentItems : tutorItems),
  ];

  return (
    <aside className="w-64 border-r border-surface bg-white flex flex-col h-[calc(100vh-64px)] sticky top-16">
      <nav className="flex-grow py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/5 text-primary border-l-4 border-primary rounded-l-none'
                  : 'text-muted hover:bg-background hover:text-heading'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="py-6 px-4 border-t border-surface space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/5 text-primary border-l-4 border-primary rounded-l-none'
                  : 'text-muted hover:bg-background hover:text-heading'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-coral hover:bg-coral/5 transition-colors mt-4">
          <span className="text-xl">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
