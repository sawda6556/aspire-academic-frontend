'use client';

import { useState, useEffect, use } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileHeader from '@/components/marketplace/ProfileHeader';

const MOCK_TUTOR = {
  id: '1',
  full_name: 'Dr. Sarah Ahmed',
  country: 'United Kingdom',
  avatar_url: '/assets/avatars/female-avatar-hijab.png',
  rating: 4.9,
  review_count: 124,
  verification_status: 'APPROVED',
  bio: "Assalamu Alaikum! I am a passionate educator with over 10 years of experience in teaching Mathematics and Physics at various levels. My goal is to make complex concepts simple and engaging for my students, while maintaining a respectful and Islamic-friendly environment. I believe every student has the potential to excel given the right guidance and support.",
  subjects: ['Mathematics', 'Physics', 'Algebra', 'Calculus'],
  qualifications: [
    'PhD in Theoretical Physics, Imperial College London',
    'MSc in Applied Mathematics, University of Oxford',
    'PGCE (Postgraduate Certificate in Education)',
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Arabic', level: 'Fluent' },
    { name: 'Urdu', level: 'Conversational' },
  ],
  experience: '12 years of professional teaching in both classroom and online settings.',
};

export default function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [tutor, setTutor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTutor() {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/tutor-profiles/${resolvedParams.id}`);
        if (response.ok) {
          const data = await response.json();
          // Merge with mock data for fields not yet in DB or just for safety
          setTutor({
            ...MOCK_TUTOR,
            ...data,
            // Ensure qualifications is an array for the UI if it comes as a string
            qualifications: typeof data.qualifications === 'string' 
              ? data.qualifications.split('\n').filter((q: string) => q.trim().length > 0)
              : MOCK_TUTOR.qualifications
          });
        } else {
          setTutor(MOCK_TUTOR);
        }
      } catch (err) {
        console.error('Failed to fetch tutor:', err);
        setTutor(MOCK_TUTOR);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTutor();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow bg-background">
        <ProfileHeader tutor={tutor} />

        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Me */}
              <section>
                <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
                  <span className="text-primary">👤</span> About Me
                </h2>
                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-surface">
                  <p className="text-muted leading-relaxed whitespace-pre-wrap">{tutor.bio}</p>
                </div>
              </section>

              {/* Subjects & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h2 className="text-xl font-bold text-heading mb-6 flex items-center gap-2">
                    <span className="text-primary">📚</span> Subjects Taught
                  </h2>
                  <div className="space-y-4">
                    {tutor.subjects_v2 ? (
                      // Group by category if we have subjects_v2
                      Object.entries(
                        tutor.subjects_v2.reduce((acc: any, s: any) => {
                          acc[s.category] = acc[s.category] || [];
                          acc[s.category].push(s);
                          return acc;
                        }, {})
                      ).map(([category, subs]: [string, any]) => (
                        <div key={category}>
                          <p className="text-[10px] font-bold uppercase text-primary/60 mb-2">{category}</p>
                          <div className="flex flex-wrap gap-2">
                            {subs.map((s: any) => (
                              <span key={s.id} className="rounded-full bg-secondary/10 px-4 py-1 text-xs font-medium text-secondary">
                                {s.name} <span className="opacity-50 text-[10px]">({s.level})</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {tutor.subjects.map((s: string) => (
                          <span key={s} className="rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-heading mb-6 flex items-center gap-2">
                    <span className="text-primary">⏳</span> Teaching Experience
                  </h2>
                  <div className="rounded-xl bg-surface/30 p-6">
                    <p className="text-heading font-semibold">{tutor.experience}</p>
                  </div>
                </section>
              </div>

              {/* Reviews */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-heading flex items-center gap-2">
                    <span className="text-primary">⭐</span> Reviews ({tutor.review_count})
                  </h2>
                  <button className="text-sm font-bold text-primary hover:underline">See All →</button>
                </div>
                
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-surface" />
                          <div>
                            <p className="text-sm font-bold text-heading">Parent {i}</p>
                            <p className="text-xs text-muted">2 days ago</p>
                          </div>
                        </div>
                        <div className="flex text-gold">
                          {'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}
                        </div>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">
                        "Excellent tutor, very patient with my daughter and explains concepts very clearly. We have seen a significant improvement in her grades."
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Sidebar info */}
            <div className="space-y-12">
              {/* Qualifications */}
              <section>
                <h2 className="text-xl font-bold text-heading mb-6">Qualifications</h2>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface space-y-4">
                  {tutor.qualifications.map((q: string, i: number) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-gold mt-1">🎓</span>
                      <p className="text-sm text-muted">{q}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-xl font-bold text-heading mb-6">Languages</h2>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface space-y-4">
                  {tutor.languages.map((l: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-heading">{l.name}</span>
                      <span className="text-xs text-muted italic">{l.level}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Availability Placeholder */}
              <section>
                <h2 className="text-xl font-bold text-heading mb-6">Weekly Availability</h2>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface text-center py-12">
                  <div className="text-4xl mb-4">🗓️</div>
                  <p className="text-sm text-muted mb-6">Book a 10-minute trial or a full lesson to see the full schedule.</p>
                  <button className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors">
                    View Schedule
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
