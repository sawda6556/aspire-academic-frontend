import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6">
          <Link href="/admin" className="text-xl font-bold tracking-tight">
            Admin Panel
          </Link>
          <p className="text-xs text-slate-400 mt-1">Aspire Academic Co.</p>
        </div>
        
        <nav className="mt-6">
          <Link 
            href="/admin" 
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="mr-3">📊</span>
            Dashboard
          </Link>
          <Link 
            href="/admin/tutors" 
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="mr-3">👨‍🏫</span>
            Tutor Applications
          </Link>
          <Link 
            href="/admin/users" 
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="mr-3">👥</span>
            User Management
          </Link>
          <Link 
            href="/admin/resources" 
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="mr-3">📚</span>
            Resource Moderation
          </Link>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6 border-t border-slate-800">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
              AD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium truncate">Admin</p>
              <Link href="/logout" className="text-xs text-slate-400 hover:text-white">Logout</Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
