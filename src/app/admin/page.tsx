'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface OverviewStats {
  totalUsers: number;
  activeTutors: number;
  pendingTutors: number;
  lessonsThisMonth: number;
  totalRevenue: number;
  trends: {
    users: number;
    tutors: number;
    lessons: number;
    revenue: number;
  };
}

interface TutorApplication {
  id: string;
  full_name: string;
  subjects_taught: string[];
  created_at: string;
  verification_status: string;
  user?: {
    full_name: string;
  };
}

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [recentApplications, setRecentApplications] = useState<TutorApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    const fetchDashboardData = async () => {
      try {
        if (!user || user.email !== 'carakay68@gmail.com') {
          router.push('/login');
          return;
        }
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        const [statsRes, tutorsRes] = await Promise.all([
          axios.get(`${baseUrl}/admin/analytics/overview`, { headers }),
          axios.get(`${baseUrl}/tutor-profiles`, { headers })
        ]);

        setStats(statsRes.data);
        
        // Filter for pending applications and take the 5 most recent
        const pending = tutorsRes.data
          .filter((t: any) => t.verification_status === 'PENDING')
          .slice(0, 5);
        setRecentApplications(pending);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please ensure the backend is running and you are logged in as admin.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, authLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        <p className="ml-3 text-gray-500">Loading live dashboard data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="text-gray-500 mt-1">Welcome back, {user?.email}</p>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Total Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalUsers || 0}</p>
          <div className={`mt-2 text-xs font-medium ${(stats?.trends.users || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {(stats?.trends.users || 0) >= 0 ? '+' : ''}{stats?.trends.users || 0}% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Pending Tutors</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats?.pendingTutors || 0}</p>
          <div className="mt-2 text-xs text-orange-500 font-medium">
            Requires attention
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Lessons This Month</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats?.lessonsThisMonth || 0}</p>
          <div className={`mt-2 text-xs font-medium ${(stats?.trends.lessons || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
             {(stats?.trends.lessons || 0) >= 0 ? '+' : ''}{stats?.trends.lessons || 0}% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">£{stats?.totalRevenue.toLocaleString() || '0'}</p>
          <div className={`mt-2 text-xs font-medium ${(stats?.trends.revenue || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {(stats?.trends.revenue || 0) >= 0 ? '+' : ''}{stats?.trends.revenue || 0}% from last month
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Tutor Applications</h2>
          <button className="text-sm text-slate-600 hover:text-slate-900 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Tutor Name</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentApplications.length > 0 ? (
                recentApplications.map((tutor) => (
                  <tr key={tutor.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{tutor.user?.full_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{tutor.subjects_taught?.join(', ') || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{tutor.created_at ? new Date(tutor.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full">
                        {tutor.verification_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline">Review</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No pending applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
