import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function SubjectsPage() {
  const categories = [
    {
      name: "Academic Core",
      subjects: ["Mathematics", "English Language", "English Literature", "Science (Combined)", "Biology", "Chemistry", "Physics"]
    },
    {
      name: "Islamic & Arabic",
      subjects: ["Quranic Studies", "Islamic Studies", "Arabic Language", "Classical Arabic"]
    },
    {
      name: "Languages",
      subjects: ["French", "Spanish", "German", "Urdu", "Bengali"]
    },
    {
      name: "Humanities & Social Sciences",
      subjects: ["History", "Geography", "Psychology", "Sociology", "Business Studies", "Economics"]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-heading mb-4">Browse Subjects</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Find expert tutors for any subject, from primary school to university level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface">
              <h2 className="text-2xl font-bold text-primary mb-6">{cat.name}</h2>
              <div className="flex flex-wrap gap-3">
                {cat.subjects.map((sub, j) => (
                  <Link 
                    key={j} 
                    href={`/tutors?subject=${encodeURIComponent(sub)}`}
                    className="px-4 py-2 bg-surface/50 hover:bg-primary hover:text-white rounded-full text-sm font-medium text-muted transition-all"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-heading mb-6">Don't see your subject?</h2>
          <p className="text-muted mb-8">We are constantly adding new subjects and tutors to our platform.</p>
          <Link href="/contact" className="text-primary font-bold hover:underline">
            Request a Subject →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
