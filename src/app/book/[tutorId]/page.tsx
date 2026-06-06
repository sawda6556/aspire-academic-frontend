'use client';

import React from 'react';
import { BookingContainer } from '@/components/booking/BookingContainer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BookingPage() {
  // In a real app, these would come from the tutor profile data
  const tutorData = {
    id: 'mock-tutor-id',
    full_name: 'Ahmad Al-Hassan',
    subject: 'Mathematics',
    hourly_rate: 35.00,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Book a Lesson</h1>
            <p className="text-gray-500 mt-2">Schedule your next learning session with {tutorData.full_name}</p>
          </div>
          
          <BookingContainer
            tutorId={tutorData.id}
            tutorName={tutorData.full_name}
            subject={tutorData.subject}
            hourlyRate={tutorData.hourly_rate}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
