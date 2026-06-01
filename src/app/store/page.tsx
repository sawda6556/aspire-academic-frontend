'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCard from '@/components/store/ResourceCard';
import { useSearchParams } from 'next/navigation';

export default function StorePage() {
  const [resources, setResources] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${apiUrl}/resources/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        let url = `${apiUrl}/resources?limit=24`;
        if (categoryFilter) url += `&category=${categoryFilter}`;
        if (search) url += `&search=${search}`;
        
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setResources(data.items || []);
        }
      } catch (err) {
        console.error('Failed to fetch resources', err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResources();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [apiUrl, categoryFilter, search]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary py-16 text-white text-center">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Educational Resources</h1>
            <p className="text-xl text-white/80 mb-8">Quality study materials from verified tutors</p>
            
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search resources (e.g. GCSE Maths, Arabic)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="absolute right-2 top-2 bg-secondary text-white px-6 py-2 rounded-full font-semibold hover:bg-secondary/90 transition-colors">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => window.location.href = `/store?category=${cat.slug}`}
                  className={`bg-white p-6 rounded-xl border ${categoryFilter === cat.slug ? 'border-primary ring-1 ring-primary' : 'border-gray-100'} shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer group`}
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon_url || '📂'}</div>
                  <div className="font-semibold text-gray-900 text-sm">{cat.name}</div>
                </div>
              ))}
              {categories.length === 0 && !loading && (
                <div className="col-span-full text-center text-gray-500 py-4">No categories found.</div>
              )}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 bg-white min-h-[400px]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {categoryFilter ? `${categories.find(c => c.slug === categoryFilter)?.name || ''} Resources` : 'All Resources'}
                </h2>
                <p className="text-gray-500">Handpicked materials to help you excel</p>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : resources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    id={resource.id}
                    title={resource.title}
                    tutorName={resource.tutor?.full_name || 'Verified Tutor'}
                    tutorAvatar={resource.tutor?.avatar_url || '/assets/avatars/male-avatar.svg'}
                    price={Number(resource.price)}
                    rating={resource.average_rating}
                    reviewCount={resource.review_count}
                    previewUrl={resource.preview_url || '/assets/resources/placeholder.jpg'}
                    gradeLevel={resource.grade_level}
                    category={resource.category?.name}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter</p>
                <button 
                  onClick={() => {setSearch(''); window.location.href = '/store'}}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
