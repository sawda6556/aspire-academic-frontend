import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function BecomeTutorPage() {
  const benefits = [
    { title: "Global Reach", desc: "Teach students from around the world from the comfort of your home.", icon: "🌍" },
    { title: "Set Your Rates", desc: "You are in control of your earnings. Set your own hourly price.", icon: "💰" },
    { title: "Flexible Schedule", desc: "Choose when you want to work and manage your own availability.", icon: "📅" },
    { title: "Supportive Community", desc: "Join a platform that respects your values and provides professional tools.", icon: "🤝" }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary py-24 text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-6 sm:text-5xl">Teach with Aspire Academic Co.</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Join our community of professional tutors and help students achieve their academic potential in a safe, Islamic-friendly environment.
            </p>
            <Link href="/signup/tutor" className="inline-block rounded-lg bg-gold px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-gold/90 transition-all transform hover:-translate-y-1">
              Apply to Teach
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-heading">Why Tutor with Us?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface text-center">
                  <div className="text-4xl mb-6">{b.icon}</div>
                  <h3 className="text-lg font-bold text-heading mb-3">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24 bg-surface/30">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-12 rounded-3xl shadow-sm ring-1 ring-surface">
              <h2 className="text-2xl font-bold text-heading mb-8 text-center">What We Look For</h2>
              <ul className="space-y-6">
                {[
                  "Subject expertise and teaching experience",
                  "Relevant educational qualifications/certificates",
                  "A professional and respectful teaching manner",
                  "Commitment to safeguarding and platform values",
                  "Reliable internet connection and clear audio/video"
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-teal font-bold">✓</span>
                    <span className="text-muted">{req}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 text-center">
                <p className="text-sm text-muted mb-8">
                  Note: All tutors must undergo identity verification and a background check (DBS for UK tutors).
                </p>
                <Link href="/signup/tutor" className="text-primary font-bold hover:underline">
                  Start Your Application →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
