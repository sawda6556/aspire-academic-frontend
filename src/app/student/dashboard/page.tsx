'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Link from 'next/link';

import Image from 'next/image';

export default function StudentDashboard() {
  const [stats, setStats] = useState([
    { label: 'Upcoming Lessons', value: '2', icon: '📅' },
    { label: 'Pending Bookings', value: '1', icon: '⏳' },
    { label: 'Completed Lessons', value: '34', icon: '🎓' },
    { label: 'Hours Learned', value: '86', icon: '⏱️' },
  ]);

  const [upcomingLessons, setUpcomingLessons] = useState([
    {
      id: '1',
      subject: 'Physics',
      tutor: 'Dr. Khan',
      time: 'Tomorrow 3:00 PM - 4:00 PM',
      avatar: '/assets/avatars/male-avatar.svg',
      zoomLink: 'https://zoom.us/j/123456789',
    },
    {
      id: '2',
      subject: 'Arabic',
      tutor: 'Fatima M.',
      time: 'Wed 5:00 PM - 6:00 PM',
      avatar: '/assets/avatars/female-avatar.svg',
      zoomLink: 'https://zoom.us/j/987654321',
    },
  ]);

  const [tutors, setTutors] = useState([
    { id: '1', name: 'Ahmad Al-Hassan', subjects: 'Math, Physics', rating: '4.9', reviews: '124', avatar: '/assets/avatars/male-avatar.svg' },
    { id: '2', name: 'Dr. Khan', subjects: 'Physics, Chemistry', rating: '5.0', reviews: '89', avatar: '/assets/avatars/male-avatar.svg' },
    { id: '3', name: 'Fatima M.', subjects: 'Arabic, Islamic Studies', rating: '4.8', reviews: '56', avatar: '/assets/avatars/female-avatar.svg' },
  ]);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar userType="STUDENT" />
      
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-heading">Welcome, Omar!</h1>
              <p className="text-muted">Keep up the great work. You're doing amazing!</p>
            </div>
            <Link 
              href="/tutors"
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Find a Tutor
            </Link>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-surface group hover:border-primary/50 transition-colors">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform inline-block">{stat.icon}</div>
                <div className="text-2xl font-bold text-heading">{stat.value}</div>
                <div className="text-xs text-muted uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Lessons and Tutors */}
            <div className="lg:col-span-2 space-y-10">
              {/* Upcoming Lessons */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-heading">Upcoming Lessons</h2>
                  <Link href="/student/lessons" className="text-primary text-sm font-semibold hover:underline">View All</Link>
                </div>
                <div className="space-y-4">
                  {upcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="bg-white p-6 rounded-2xl shadow-sm border border-surface flex items-center justify-between hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface relative">
                          <Image src={lesson.avatar} alt={lesson.tutor} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-heading">{lesson.subject} with {lesson.tutor}</h4>
                          <p className="text-sm text-muted">{lesson.time}</p>
                        </div>
                      </div>
                      <a 
                        href={lesson.zoomLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-teal/90 transition-colors flex items-center gap-2"
                      >
                        <span>📹</span> Join Lesson
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* Your Tutors */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-heading">Your Tutors</h2>
                  <Link href="/student/tutors" className="text-primary text-sm font-semibold hover:underline">Manage Tutors</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tutors.map((tutor) => (
                    <div key={tutor.id} className="bg-white p-6 rounded-2xl shadow-sm border border-surface text-center hover:border-primary/30 transition-colors">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/10 mx-auto mb-4 relative">
                        <Image src={tutor.avatar} alt={tutor.name} fill className="object-cover" />
                      </div>
                      <h3 className="font-bold text-heading truncate">{tutor.name}</h3>
                      <p className="text-xs text-muted mb-3 h-8 line-clamp-2">{tutor.subjects}</p>
                      <div className="flex items-center justify-center gap-1 text-gold text-sm font-bold mb-4">
                        <span>⭐</span> {tutor.rating} <span className="text-muted font-normal">({tutor.reviews})</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="bg-primary/5 text-primary text-xs font-bold py-2 rounded-lg hover:bg-primary/10 transition-colors">Message</button>
                        <button className="bg-gold/10 text-gold text-xs font-bold py-2 rounded-lg hover:bg-gold/20 transition-colors">Book Again</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Resources and Learning */}
            <div className="space-y-10">
              <section className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Continue Learning</h2>
                  <p className="text-white/80 text-sm mb-6">Pick up where you left off in your latest resource.</p>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
                    <h3 className="font-bold mb-1">Algebra Workbook</h3>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                      <div className="bg-white h-full w-[65%]"></div>
                    </div>
                    <p className="text-[10px] text-white/60 text-right font-bold">65% COMPLETED</p>
                  </div>
                  <button className="w-full bg-white text-primary py-3 rounded-xl font-bold hover:bg-white/90 transition-colors">
                    Continue Resource
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
              </section>

              <section className="bg-white rounded-3xl p-8 border border-surface shadow-sm">
                <h2 className="text-xl font-bold text-heading mb-6">Recent Resources</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Physics Guide', type: 'PDF', icon: '📄' },
                    { title: 'Arabic Basics', type: 'Video', icon: '🎬' },
                    { title: 'Quran Tafseer', type: 'Audio', icon: '🔊' },
                  ].map((res) => (
                    <div key={res.title} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-background transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-xl group-hover:bg-white transition-colors">{res.icon}</div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-heading">{res.title}</h4>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-wider">{res.type}</p>
                      </div>
                      <button className="text-primary">⬇️</button>
                    </div>
                  ))}
                </div>
                <Link href="/student/resources" className="block text-center mt-6 text-sm font-bold text-primary hover:underline">View All Resources</Link>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
