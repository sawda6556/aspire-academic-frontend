'use client';

import React from 'react';
import { MessagingContainer } from '@/components/messaging/MessagingContainer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MessagesPage() {
  // In a real app, these would come from an Auth Context
  const currentUserId = 'mock-user-id-1';
  const token = 'mock-jwt-token';

  const mockConversations = [
    {
      otherUser: {
        id: 'mock-user-id-2',
        full_name: 'Ahmad Al-Hassan',
        avatar_url: '/assets/avatars/male-avatar.svg',
        online: true,
      },
      lastMessage: {
        id: '1',
        sender_id: 'mock-user-id-2',
        receiver_id: 'mock-user-id-1',
        content: "Hello! I'd like to inquire about your Math tutoring...",
        created_at: new Date().toISOString(),
      },
      unreadCount: 1,
    },
    {
      otherUser: {
        id: 'mock-user-id-3',
        full_name: 'Sara Khan',
        avatar_url: '/assets/avatars/female-avatar.svg',
        online: false,
      },
      lastMessage: {
        id: '2',
        sender_id: 'mock-user-id-1',
        receiver_id: 'mock-user-id-3',
        content: "When are you available for a trial lesson?",
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      unreadCount: 0,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 h-[700px]">
          <MessagingContainer
            currentUserId={currentUserId}
            token={token}
            initialConversations={mockConversations}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
