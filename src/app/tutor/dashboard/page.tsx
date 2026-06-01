'use client';

import React, { useEffect, useState } from 'react';
import TutorDashboardLayout from '@/components/dashboard/TutorDashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { useRouter } from 'next/navigation';

export default function TutorDashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Earnings', value: '$0.00', icon: '💰' },
    { label: 'Active Students', value: '0', icon: '👥' },
    { label: 'Lessons This Week', value: '0', icon: '📅' },
    { label: 'Resource Sales', value: '0', icon: '📂' },
  ]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Fetch tutor resources to get some stats
        const res = await fetch(`${apiUrl}/resources/tutor/my-resources`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const resources = await res.json();
          const totalSales = resources.reduce((sum: number, r: any) => sum + r.review_count, 0); // Mocking sales with review count for now
          const publishedCount = resources.filter((r: any) => r.status === 'PUBLISHED').length;
          
          setStats([
            { label: 'Total Earnings', value: `$${(totalSales * 10).toFixed(2)}`, icon: '💰' },
            { label: 'Published Resources', value: publishedCount.toString(), icon: '📂' },
            { label: 'Active Students', value: '3', icon: '👥' },
            { label: 'Lessons This Week', value: '5', icon: '📅' },
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch tutor stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [apiUrl, router]);

  return (
    <TutorDashboardLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-heading">Tutor Dashboard</h1>
          <p className="text-muted">Welcome back! Here is an overview of your teaching activities.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat) => (
                <StatsCard key={stat.label} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white p-8 rounded-3xl border border-surface shadow-sm">
                  <h2 className="text-xl font-bold text-heading mb-6">Upcoming Lessons</h2>
                  <div className="text-center py-10 text-muted">
                    <p>No lessons scheduled for today.</p>
                    <button className="mt-4 text-primary font-bold hover:underline">View Schedule</button>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section className="bg-primary rounded-3xl p-8 text-white">
                  <h2 className="text-xl font-bold mb-4">Resource Store</h2>
                  <p className="text-white/80 text-sm mb-6">You have {stats[1].value} published resources. Increase your passive income by sharing more materials.</p>
                  <button 
                    onClick={() => router.push('/tutor/resources/upload')}
                    className="w-full bg-white text-primary py-3 rounded-xl font-bold hover:bg-white/90 transition-colors"
                  >
                    Upload New Resource
                  </button>
                </section>

                <section className="bg-white p-8 rounded-3xl border border-surface shadow-sm">
                  <h2 className="text-xl font-bold text-heading mb-6">Recent Sales</h2>
                  <div className="space-y-4">
                    <p className="text-sm text-muted italic">No recent sales data available.</p>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </TutorDashboardLayout>
  );
}
