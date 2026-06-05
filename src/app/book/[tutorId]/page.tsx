'use client';

import { useState, useEffect, use, Suspense } from 'react';
import { BookingContainer } from '@/components/booking/BookingContainer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useSearchParams } from 'next/navigation';

function BookingContent({ tutorId }: { tutorId: string }) {
  const searchParams = useSearchParams();
  const isTrialParam = searchParams.get('trial') === 'true';
  const [tutor, setTutor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTutor() {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/tutor-profiles/${tutorId}`);
        if (response.ok) {
          const data = await response.json();
          setTutor(data);
        }
      } catch (err) {
        console.error('Failed to fetch tutor for booking:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTutor();
  }, [tutorId]);

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const tutorName = tutor?.full_name || 'Tutor';
  // Use first subject or a default
  const subject = (tutor?.subjects_v2?.[0]?.name) || (tutor?.subjects?.[0]) || 'Tutoring';
  const hourlyRate = tutor?.hourly_rate || 20;

  return (
    <main className="flex-1 bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book a Lesson</h1>
          <p className="text-gray-500 mt-2">Schedule your next learning session with {tutorName}</p>
        </div>
        
        <BookingContainer
          tutorId={tutorId}
          tutorName={tutorName}
          subject={subject}
          hourlyRate={hourlyRate}
          initialIsTrial={isTrialParam}
        />
      </div>
    </main>
  );
}

export default function BookingPage({ params }: { params: Promise<{ tutorId: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      }>
        <BookingContent tutorId={resolvedParams.tutorId} />
      </Suspense>
      <Footer />
    </div>
  );
}
