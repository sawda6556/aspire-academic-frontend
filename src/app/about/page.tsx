import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary py-24 text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Empowering Education with Values
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Aspire Academic Co. is more than just a tutoring platform. We are a community dedicated to safe, professional, and Islamic-friendly online learning.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-heading mb-6">Our Mission</h2>
                <p className="text-lg text-muted mb-6 leading-relaxed">
                  Our mission is to provide a trusted environment where parents feel safe booking tutors for their children, and adult students can independently access high-quality education.
                </p>
                <p className="text-lg text-muted mb-6 leading-relaxed">
                  We believe that education should be accessible, professional, and respectful of family values. By combining modern technology with traditional principles, we've created a seamless experience for tutors and students alike.
                </p>
              </div>
              <div className="bg-surface rounded-3xl p-8 aspect-video flex items-center justify-center relative overflow-hidden ring-1 ring-surface shadow-sm">
                <div className="text-primary text-6xl opacity-20 absolute -top-4 -left-4">📚</div>
                <div className="text-secondary text-6xl opacity-20 absolute -bottom-4 -right-4">🛡️</div>
                <p className="text-2xl font-semibold text-primary text-center italic">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-surface/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-heading mb-4">Our Core Values</h2>
              <p className="text-muted max-w-2xl mx-auto">The principles that guide everything we do at Aspire Academic Co.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Privacy First",
                  description: "We protect our community's privacy by using assigned avatars instead of personal photos.",
                  icon: "🔒"
                },
                {
                  title: "Safety & Trust",
                  description: "Every tutor is manually verified with identity and qualification checks for your peace of mind.",
                  icon: "🛡️"
                },
                {
                  title: "Professionalism",
                  description: "We maintain high standards of teaching and platform conduct to ensure quality learning.",
                  icon: "💼"
                },
                {
                  title: "Family Friendly",
                  description: "Our platform is designed around Islamic values and is safe for the whole family.",
                  icon: "🤝"
                }
              ].map((value, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface transition-transform hover:-translate-y-1">
                  <div className="text-4xl mb-6">{value.icon}</div>
                  <h3 className="text-xl font-bold text-heading mb-3">{value.title}</h3>
                  <p className="text-muted leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team/Story Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-heading mb-8">Our Story</h2>
            <div className="max-w-3xl mx-auto text-lg text-muted leading-relaxed space-y-6">
              <p>
                Aspire Academic Co. was founded to bridge the gap between high-quality online tutoring and the need for a safe, value-aligned environment. We noticed that many platforms lacked the specific privacy and safeguarding features that Islamic-friendly families look for.
              </p>
              <p>
                Today, we are proud to support hundreds of students and tutors globally, providing a space where education thrives without compromising on principles.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
