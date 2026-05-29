'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const MOCK_RESOURCES = {
  '1': {
    id: '1',
    title: 'Complete GCSE Mathematics Workbook',
    description: `This comprehensive workbook covers the entire GCSE Mathematics curriculum. 
    It includes over 500 practice questions, step-by-step solutions for every problem, 
    and exam-style mock tests to build your confidence. 
    
    Perfect for self-study or as a supplement to classroom learning. 
    Focuses on Algebra, Geometry, Statistics, and Number systems.`,
    tutorName: 'Ahmad A.',
    tutorAvatar: '/assets/avatars/male-avatar.svg',
    price: 9.99,
    rating: 4.8,
    reviewCount: 124,
    previewUrl: '/assets/resources/math-workbook.jpg',
    gradeLevel: 'GCSE',
    category: 'Math',
    subjects: ['Algebra', 'Geometry', 'Calculus'],
    fileType: 'PDF',
    fileSize: '15.4 MB',
    pages: 145,
    lastUpdated: 'May 2026',
    reviews: [
      { id: 'r1', user: 'Sarah M.', rating: 5, date: '2 days ago', text: 'Excellent resource! My son found the explanations very clear.' },
      { id: 'r2', user: 'James L.', rating: 4, date: '1 week ago', text: 'Great practice problems, though I wish there were more geometry questions.' }
    ]
  },
  // ... other mock resources would be here
};

export default function ResourceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const resource = MOCK_RESOURCES[id as keyof typeof MOCK_RESOURCES] || MOCK_RESOURCES['1'];
  
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

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
                  src={resource.previewUrl}
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
                    Reviews ({resource.reviewCount})
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
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Comprehensive coverage of all topics</li>
                    <li>Exam-style questions with detailed marking schemes</li>
                    <li>Instant digital download (PDF format)</li>
                    <li>Lifetime access and free updates</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-6">
                  {resource.reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-900">{review.user}</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-500 text-xs mb-2">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                      <p className="text-gray-600 text-sm">{review.text}</p>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-semibold text-gray-400 hover:border-primary hover:text-primary transition-colors">
                    Write a Review
                  </button>
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
                      src={resource.tutorAvatar}
                      alt={resource.tutorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{resource.tutorName}</p>
                    <p className="text-xs text-gray-500">Verified Tutor</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="text-3xl font-bold text-gray-900">
                    {resource.price === 0 ? 'Free' : `$${resource.price.toFixed(2)}`}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-gray-900">{resource.rating}</span>
                    <span className="text-gray-400 text-sm">({resource.reviewCount})</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <button className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary/90 transition-transform active:scale-95 shadow-lg shadow-secondary/20">
                    Buy Now
                  </button>
                  <button className="w-full bg-white border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-colors">
                    Add to Cart
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Format</span>
                    <span className="font-semibold text-gray-900">{resource.fileType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">File Size</span>
                    <span className="font-semibold text-gray-900">{resource.fileSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pages</span>
                    <span className="font-semibold text-gray-900">{resource.pages}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="font-semibold text-gray-900">{resource.lastUpdated}</span>
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
