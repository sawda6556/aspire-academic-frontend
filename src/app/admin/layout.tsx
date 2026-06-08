'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.email !== 'carakay68@gmail.com')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className=\"flex min-h-screen items-center justify-center bg-gray-50\">
        <div className=\"animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900\"></div>
      </div>
    );
  }

  if (!user || user.email !== 'carakay68@gmail.com') {
    return null;
  }

  return (
    <div className=\"flex min-h-screen bg-gray-50\">
      {/* Admin Sidebar */}
      <aside className=\"w-64 bg-slate-900 text-white flex-shrink-0 sticky top-0 h-screen\">
        <div className=\"p-6\">
          <Link href=\"/admin\" className=\"text-xl font-bold tracking-tight\">
            Admin Panel
          </Link>
          <p className=\"text-xs text-slate-400 mt-1\">Aspire Academic Co.</p>
        </div>
        <nav className=\"mt-6\">
          <Link
            href=\"/admin\"
            className=\"flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors\"
          >
            <span className=\"mr-3\">📊</span>
            Dashboard
          </Link>
          <Link
            href=\"/admin/tutors\"
            className=\"flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors\"
          >
            <span className=\"mr-3\">👨‍🏫</span>
            Tutor Applications
          </Link>
          <Link
            href=\"/admin/users\"
            className=\"flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors\"
          >
            <span className=\"mr-3\">👥</span>
            User Management
          </Link>
          <Link
            href=\"/admin/resources\"
            className=\"flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors\"
          >
            <span className=\"mr-3\">📚</span>
            Resource Moderation
          </Link>
        </nav>
        <div className=\"absolute bottom-0 w-64 p-6 border-t border-slate-800\">
          <div className=\"flex items-center\">
            <div className=\"h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold\">
              {user.full_name?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className=\"ml-3\">
              <p className=\"text-sm font-medium truncate\">{user.full_name || 'Admin'}</p>
              <button onClick={logout} className=\"text-xs text-slate-400 hover:text-white\">Logout</button>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className=\"flex-1 p-8 overflow-auto\">
        {children}
      </main>
    </div>
  );
}
