import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function HowItWorksPage() {
  const flows = [
    {
      title: "For Parents",
      steps: [
        { n: "1", title: "Create Account", desc: "Sign up as a parent and add your children's profiles." },
        { n: "2", title: "Find a Tutor", desc: "Browse verified tutors by subject, price, and availability." },
        { n: "3", title: "Book a Lesson", desc: "Schedule your first session or a free 10-minute trial." },
        { n: "4", title: "Start Learning", desc: "Join secure video sessions in our safe online environment." }
      ]
    },
    {
      title: "For Students (18+)",
      steps: [
        { n: "1", title: "Sign Up", desc: "Register independently as a student over 18." },
        { n: "2", title: "Explore Tutors", desc: "Find the perfect match for your academic goals." },
        { n: "3", title: "Book & Learn", desc: "Manage your own schedule and grow professionally." }
      ]
    },
    {
      title: "For Tutors",
      steps: [
        { n: "1", title: "Apply", desc: "Submit your qualifications and identity for verification." },
        { n: "2", title: "Get Verified", desc: "Our admin team manually reviews and approves your profile." },
        { n: "3", title: "Start Teaching", desc: "Set your own rates and schedule to build your career." }
      ]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-surface/30 py-20 border-b border-surface">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-heading mb-4">How It Works</h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Get started with Aspire Academic Co. in just a few simple steps.
            </p>
          </div>
        </section>

        {/* Flows section */}
        <section className="py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {flows.map((flow, flowIdx) => (
                <div key={flowIdx}>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="h-1 bg-primary flex-grow rounded-full opacity-20"></div>
                    <h2 className="text-2xl font-extrabold text-primary uppercase tracking-widest px-4">
                      {flow.title}
                    </h2>
                    <div className="h-1 bg-primary flex-grow rounded-full opacity-20"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {flow.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface relative overflow-hidden group hover:ring-primary/50 transition-all">
                        <div className="absolute -right-4 -top-4 text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                          {step.n}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold mb-6 relative z-10 shadow-sm">
                          {step.n}
                        </div>
                        <h3 className="text-lg font-bold text-heading mb-3 relative z-10">{step.title}</h3>
                        <p className="text-sm text-muted leading-relaxed relative z-10">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-24 bg-primary text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup?type=parent" className="rounded-lg bg-gold px-8 py-3 text-sm font-bold text-white hover:bg-gold/90 transition-colors">
                Sign Up as Parent
              </Link>
              <Link href="/signup?type=student" className="rounded-lg border-2 border-white px-8 py-3 text-sm font-bold text-white hover:bg-white hover:text-primary transition-colors">
                Sign Up as Student
              </Link>
              <Link href="/become-tutor" className="rounded-lg bg-secondary px-8 py-3 text-sm font-bold text-white hover:bg-secondary/90 transition-colors">
                Become a Tutor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
