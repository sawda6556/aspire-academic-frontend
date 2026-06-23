'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PurchaseSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resourceId = searchParams.get('id');
  const [resource, setResource] = useState<any>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (resourceId) {
      fetch(`${apiUrl}/resources/${resourceId}`)
        .then(res => res.json())
        .then(data => setResource(data))
        .catch(err => console.error(err));
    }
  }, [apiUrl, resourceId]);

  return (
    <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
        <div className="w-20 h-20 bg-teal/10 text-teal rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase Successful!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your resource <strong>{resource?.title || 'loading...'}</strong> is now available for download.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/student/resources"
            className="block w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Go to My Resources
          </Link>
          <Link 
            href="/store"
            className="block w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={
        <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
      }>
        <PurchaseSuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
