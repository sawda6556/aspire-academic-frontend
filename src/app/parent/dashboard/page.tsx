'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function ParentDashboard() {
  const [children, setChildren] = useState([
    { id: '1', name: 'Ahmad Jr.', grade: 'Grade 8', avatar: '/assets/avatars/male-avatar.svg' },
    { id: '2', name: 'Sara', grade: 'Grade 5', avatar: '/assets/avatars/female-avatar-hijab.png' },
  ]);

  const [isAddChildOpen, setIsAddChildOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar userType="PARENT" />
      
      <main className="flex-grow p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-heading">Welcome, Fatima!</h1>
            <p className="text-muted">Here's what's happening with your children's learning.</p>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Upcoming Lessons', value: '3', icon: '📅' },
              { label: 'Pending Bookings', value: '2', icon: '⏳' },
              { label: 'Total Sessions', value: '47', icon: '🎓' },
              { label: 'Spending (Mo)', value: '$280', icon: '💰' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-surface">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-heading">{stat.value}</div>
                <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Children Management */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-heading">Your Children</h2>
              <button 
                onClick={() => setIsAddChildOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                + Add Child
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map((child) => (
                <div key={child.id} className="bg-white p-6 rounded-2xl shadow-sm border border-surface flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/10">
                    <img src={child.avatar} alt={child.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-heading">{child.name}</h3>
                    <p className="text-sm text-muted">{child.grade}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-primary text-sm font-medium px-3 py-1 border border-primary rounded-lg hover:bg-primary/5">Manage</button>
                    <button className="bg-gold text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-gold/90">Book</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Lessons */}
          <section>
            <h2 className="text-xl font-semibold text-heading mb-6">Upcoming Lessons</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-surface overflow-hidden">
              <div className="p-6 border-b border-surface flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">📐</div>
                  <div>
                    <h4 className="font-bold text-heading">Math with Ahmad A.</h4>
                    <p className="text-sm text-muted">Tomorrow 2:00 PM - 3:00 PM</p>
                  </div>
                </div>
                <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-semibold">Confirmed</span>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">📚</div>
                  <div>
                    <h4 className="font-bold text-heading">English with Sara M.</h4>
                    <p className="text-sm text-muted">Wed 4:00 PM - 5:00 PM</p>
                  </div>
                </div>
                <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">Pending</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mock Add Child Modal */}
      {isAddChildOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add Child</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-heading mb-2">Child's Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-2">Gender (for avatar)</label>
                <div className="flex gap-4">
                  <button className="flex-grow p-4 border-2 border-primary rounded-2xl bg-primary/5 flex flex-col items-center">
                    <img src="/assets/avatars/male-avatar.svg" className="w-12 h-12 mb-2" />
                    <span className="text-xs font-bold">Boy</span>
                  </button>
                  <button className="flex-grow p-4 border-2 border-surface rounded-2xl hover:border-primary/50 flex flex-col items-center">
                    <img src="/assets/avatars/female-avatar-hijab.png" className="w-12 h-12 mb-2" />
                    <span className="text-xs font-bold">Girl</span>
                  </button>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setIsAddChildOpen(false)} className="flex-grow py-3 text-muted font-medium">Cancel</button>
                <button className="flex-grow py-3 bg-primary text-white rounded-xl font-bold">Save Child</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
