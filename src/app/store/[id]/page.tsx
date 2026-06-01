'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(`${apiUrl}/resources/${id}`);
        if (res.ok) {
          const data = await res.json();
          setResource(data);
        } else {
          console.error('Resource not found');
        }
      } catch (err) {
        console.error('Failed to fetch resource', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResource();
  }, [apiUrl, id]);

  const handleBuy = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/login?redirect=/store/${id}`);
      return;
    }

    setBuying(true);
    try {
      const res = await fetch(`${apiUrl}/resources/${id}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          payment_method_id: 'pm_card_visa' // Mock for now
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        }
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to initiate purchase');
      }
    } catch (err) {
      console.error('Purchase failed', err);
      alert('An error occurred during purchase');
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">Resource not found</h1>
          <button onClick={() => router.push('/store')} className="text-primary font-bold">Back to Store</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Preview Images & Description */}
            <div className="lg:w-2/3">
              <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 mb-8">
                <Image
                  src={resource.preview_url || '/assets/resources/placeholder.jpg'}
                  alt={resource.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="border-b border-gray-200 mb-6">
                <nav className="flex gap-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-4 text-sm font-semibold transition-colors relative ${
                      activeTab === 'description' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Description
                    {activeTab === 'description' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-4 text-sm font-semibold transition-colors relative ${
                      activeTab === 'reviews' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Reviews ({resource.review_count})
                    {activeTab === 'reviews' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </button>
                </nav>
              </div>

              {activeTab === 'description' ? (
                <div className="prose max-w-none text-gray-600">
                  <p className="whitespace-pre-line">{resource.description}</p>
                  
                  <h4 className="text-gray-900 font-bold mt-8 mb-4">Key Features</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Comprehensive coverage: {resource.subjects?.join(', ') || 'Various topics'}</li>
                    <li>Level: {resource.grade_level || 'General'}</li>
                    <li>Instant digital download</li>
                    <li>Verified content from {resource.tutor?.full_name}</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-6">
                  {resource.reviews?.map((review: any) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-900">{review.user?.email.split('@')[0]}</span>
                        <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex text-yellow-500 text-xs mb-2">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                  {(!resource.reviews || resource.reviews.length === 0) && (
                    <p className="text-gray-500 text-center py-8 italic">No reviews yet. Be the first to purchase and review!</p>
                  )}
                  <p className="text-xs text-gray-400 text-center italic">Only verified purchasers can leave reviews.</p>
                </div>
              )}
            </div>

            {/* Right: Purchase Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 sticky top-28">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h1>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={resource.tutor?.avatar_url || '/assets/avatars/male-avatar.svg'}
                      alt={resource.tutor?.full_name || 'Tutor'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{resource.tutor?.full_name}</p>
                    <p className="text-xs text-gray-500">Verified Tutor</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="text-3xl font-bold text-gray-900">
                    {Number(resource.price) === 0 ? 'Free' : `$${Number(resource.price).toFixed(2)}`}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-gray-900">{resource.average_rating}</span>
                    <span className="text-gray-400 text-sm">({resource.review_count})</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <button 
                    onClick={handleBuy}
                    disabled={buying}
                    className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary/90 transition-transform active:scale-95 shadow-lg shadow-secondary/20 flex items-center justify-center disabled:opacity-70"
                  >
                    {buying ? (
                      <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
                    ) : (
                      'Buy Now'
                    )}
                  </button>
                  <button className="w-full bg-white border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-colors">
                    Add to Wishlist
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="font-semibold text-gray-900">{resource.category?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level</span>
                    <span className="font-semibold text-gray-900">{resource.grade_level || 'General'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="font-semibold text-gray-900">{new Date(resource.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-xs text-gray-400">
                    Secure checkout with Stripe. 
                    <br />
                    Instant download after purchase.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
