'use client';

import React, { useEffect, useState } from 'react';
import TutorDashboardLayout from '@/components/dashboard/TutorDashboardLayout';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TutorResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchMyResources = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/resources/tutor/my-resources`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setResources(data);
        }
      } catch (err) {
        console.error('Failed to fetch tutor resources', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyResources();
  }, [apiUrl, router]);

  return (
    <TutorDashboardLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-heading">My Educational Resources</h1>
            <p className="text-muted">Manage your study materials and track their performance.</p>
          </div>
          <button 
            onClick={() => router.push('/tutor/resources/upload')}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <span>➕</span> Upload New Resource
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : resources.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-surface overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-surface">
                  <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface">
                {resources.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-surface bg-gray-100 flex-shrink-0">
                          <Image 
                            src={res.preview_url || '/assets/resources/placeholder.jpg'} 
                            alt={res.title} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-heading">{res.title}</div>
                          <div className="text-xs text-muted">Uploaded: {new Date(res.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-heading">{res.category?.name || 'General'}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-heading">
                      ${Number(res.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        res.status === 'PUBLISHED' ? 'bg-teal/10 text-teal' : 'bg-gold/10 text-gold'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-xs">
                          <span className="font-bold text-heading">⭐ {res.average_rating}</span>
                          <span className="text-muted ml-1">({res.review_count})</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-muted hover:text-primary transition-colors">
                          <span className="text-xl">✏️</span>
                        </button>
                        <button className="p-2 text-muted hover:text-coral transition-colors">
                          <span className="text-xl">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-surface shadow-sm">
            <div className="text-6xl mb-6">📂</div>
            <h2 className="text-2xl font-bold text-heading mb-2">No resources uploaded</h2>
            <p className="text-muted max-w-md mx-auto mb-8">Start sharing your expertise and earning extra income by uploading your first educational resource.</p>
            <button 
              onClick={() => router.push('/tutor/resources/upload')}
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Upload Your First Resource
            </button>
          </div>
        )}
      </div>
    </TutorDashboardLayout>
  );
}
