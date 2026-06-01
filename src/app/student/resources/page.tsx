'use client';

import React, { useEffect, useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StudentResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchPurchased = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/resources/purchased`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setResources(data);
        }
      } catch (err) {
        console.error('Failed to fetch purchased resources', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchased();
  }, [apiUrl, router]);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar userType="STUDENT" />
      
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-heading">My Resources</h1>
              <p className="text-muted">Access all your purchased study materials here.</p>
            </div>
            <button 
              onClick={() => router.push('/store')}
              className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary/90 transition-all"
            >
              Browse Store
            </button>
          </header>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((res) => (
                <div key={res.id} className="bg-white rounded-2xl shadow-sm border border-surface overflow-hidden flex flex-col">
                  <div className="relative h-48 bg-gray-100">
                    <Image 
                      src={res.preview_url || '/assets/resources/placeholder.jpg'} 
                      alt={res.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">
                        {res.category?.name || 'Resource'}
                      </span>
                      <span className="text-[10px] text-muted font-medium">
                        Purchased: {new Date(res.purchased_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-heading mb-2 line-clamp-1">{res.title}</h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">{res.description}</p>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image src={res.tutor?.avatar_url || '/assets/avatars/male-avatar.svg'} alt="Tutor" fill />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{res.tutor?.full_name}</span>
                    </div>

                    <a 
                      href={res.download_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-teal text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal/90 transition-colors"
                    >
                      <span>⬇️</span> Download Resource
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-surface shadow-sm">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-2xl font-bold text-heading mb-2">No resources yet</h2>
              <p className="text-muted max-w-md mx-auto mb-8">You haven't purchased any study materials yet. Explore the store to find amazing resources from our tutors.</p>
              <button 
                onClick={() => router.push('/store')}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Go to Store
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
