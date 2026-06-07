'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface AnalyticsData {
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

interface TutorProfile {
  id: string;
  user: {
    full_name: string;
  };
  subjects: string[];
  verification_status: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [recentTutors, setRecentTutors] = useState<TutorProfile[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.email !== 'carakay68@gmail.com') {
        // Restricted to specific admin email as per task requirement
        router.push('/login');
        return;
      }
      fetchData();
    }
  }, [user, isLoading, router]);

  const fetchData = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const [analyticsRes, tutorsRes] = await Promise.all([
        fetch(`${baseUrl}/admin/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${baseUrl}/tutor-profiles`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (analyticsRes.ok) {
        setData(await analyticsRes.json());
      } else {
        setError(`Failed to fetch analytics: ${analyticsRes.status}`);
      }

      if (tutorsRes.ok) {
        const tutors = await tutorsRes.json();
        // Filter for pending tutors for the "Recent Applications" table
        setRecentTutors(tutors.filter((t: any) => t.verification_status === 'PENDING').slice(0, 5));
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      setError('Connection error. Please ensure the backend is running.');
    } finally {
      setIsFetching(false);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500">Loading live dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
        <h2 className="text-red-800 font-bold">Error</h2>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="text-gray-500 mt-1">Welcome back, {user?.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Total Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{data.totalUsers}</p>
          <div className="mt-2 text-xs text-green-500 font-medium">
            +{data.trends.users}% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Pending Tutors</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{data.pendingTutors}</p>
          <div className="mt-2 text-xs text-orange-500 font-medium">
            Requires attention
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Lessons (Month)</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{data.lessonsThisMonth}</p>
          <div className="mt-2 text-xs text-green-500 font-medium">
            +{data.trends.lessons}% from last week
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">£{data.totalRevenue.toLocaleString()}</p>
          <div className="mt-2 text-xs text-green-500 font-medium">
            +{data.trends.revenue}% from last month
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Recent Tutor Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Tutor Name</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTutors.map((tutor) => (
                <tr key={tutor.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{tutor.user?.full_name || 'Unknown'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tutor.subjects?.join(', ') || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full">
                      {tutor.verification_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline">Review</td>
                </tr>
              ))}
              {recentTutors.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-sm text-center text-gray-500">
                    No pending tutor applications at this time.
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
