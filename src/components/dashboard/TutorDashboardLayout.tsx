'use client';

import DashboardSidebar from './DashboardSidebar';
import Header from '../layout/Header';

export default function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <DashboardSidebar userType="TUTOR" />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
