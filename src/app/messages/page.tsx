'use client';

import React, { Suspense } from 'react';
import { MessagingContainer } from '@/components/messaging/MessagingContainer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

function MessagesContent() {
  const { user, token, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const tutorId = searchParams.get('tutorId');

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !token) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view messages</h1>
          <a href="/login" className="text-primary font-bold hover:underline">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 h-[700px]">
      <MessagingContainer
        currentUserId={user.id}
        token={token}
        initialActiveConversationId={tutorId || undefined}
      />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <Suspense fallback={
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        }>
          <MessagesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
