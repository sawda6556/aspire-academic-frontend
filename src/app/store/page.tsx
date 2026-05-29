import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCard from '@/components/store/ResourceCard';
import Image from 'next/image';

const MOCK_RESOURCES = [
  {
    id: '1',
    title: 'Complete GCSE Mathematics Workbook',
    tutorName: 'Ahmad A.',
    tutorAvatar: '/assets/avatars/male-avatar.svg',
    price: 9.99,
    rating: 4.8,
    reviewCount: 124,
    previewUrl: '/assets/resources/math-workbook.jpg',
    gradeLevel: 'GCSE',
    category: 'Math',
  },
  {
    id: '2',
    title: 'Islamic Studies for Beginners',
    tutorName: 'Fatima Z.',
    tutorAvatar: '/assets/avatars/female-avatar-hijab.png',
    price: 15.00,
    rating: 4.9,
    reviewCount: 86,
    previewUrl: '/assets/resources/islamic-studies.jpg',
    gradeLevel: 'Primary',
    category: 'Islamic Studies',
  },
  {
    id: '3',
    title: 'A-Level Physics: Quantum Mechanics Guide',
    tutorName: 'Omar K.',
    tutorAvatar: '/assets/avatars/male-avatar.svg',
    price: 12.50,
    rating: 4.7,
    reviewCount: 45,
    previewUrl: '/assets/resources/physics-guide.jpg',
    gradeLevel: 'A-Level',
    category: 'Science',
  },
  {
    id: '4',
    title: 'Arabic Calligraphy Practice Sheets',
    tutorName: 'Zainab S.',
    tutorAvatar: '/assets/avatars/female-avatar-hijab.png',
    price: 5.00,
    rating: 5.0,
    reviewCount: 32,
    previewUrl: '/assets/resources/arabic-calligraphy.jpg',
    gradeLevel: 'All Ages',
    category: 'Art',
  },
];

const CATEGORIES = [
  { name: 'Math', icon: '📐', count: 42 },
  { name: 'Science', icon: '🔬', count: 35 },
  { name: 'Languages', icon: '🌐', count: 28 },
  { name: 'Islamic Studies', icon: '📜', count: 22 },
  { name: 'English', icon: '📖', count: 31 },
  { name: 'Art', icon: '🎨', count: 18 },
  { name: 'Music', icon: '🎵', count: 15 },
  { name: 'History', icon: '🏛️', count: 19 },
];

export default function StorePage() {
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
              {CATEGORIES.map((cat) => (
                <div key={cat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm">{cat.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{cat.count} resources</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Resources</h2>
                <p className="text-gray-500">Handpicked materials to help you excel</p>
              </div>
              <button className="text-primary font-semibold hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_RESOURCES.map((resource) => (
                <ResourceCard key={resource.id} {...resource} />
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_RESOURCES.slice().reverse().map((resource) => (
                <ResourceCard key={resource.id} {...resource} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
