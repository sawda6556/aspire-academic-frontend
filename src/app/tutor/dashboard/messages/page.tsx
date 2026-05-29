'use client';

import React, { useEffect, useState } from 'react';
import { MessagingContainer } from '@/components/messaging/MessagingContainer';
import TutorDashboardLayout from '@/components/dashboard/TutorDashboardLayout';
import { useRouter } from 'next/navigation';

export default function TutorMessagesPage() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
      return;
    }
    setToken(storedToken);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Unauthorized');
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  if (isLoading || !user || !token) {
    return (
      <TutorDashboardLayout>
        <div className="flex items-center justify-center h-[600px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </TutorDashboardLayout>
    );
  }

  return (
    <TutorDashboardLayout>
      <div className="h-[calc(100vh-160px)]">
        <MessagingContainer
          currentUserId={user.id}
          token={token}
        />
      </div>
    </TutorDashboardLayout>
  );
}
