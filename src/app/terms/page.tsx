import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-heading mb-10">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-muted space-y-6 leading-relaxed">
          <p>Last updated: May 2026</p>
          <p>
            Welcome to Aspire Academic Co. By using our platform, you agree to comply with and be bound by the following terms and conditions.
          </p>
          
          <h2 className="text-2xl font-bold text-heading mt-10">1. User Eligibility</h2>
          <p>
            Tutors must be over 18 and provide valid proof of identity and qualifications. Students registering independently must be over 18. Parents must manage accounts for children under 18.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">2. Professional Conduct</h2>
          <p>
            All users must maintain professional and respectful behavior. Our platform is designed to be Islamic-friendly; users are expected to respect these values in their interactions.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">3. Booking, Payments & Refund Policy</h2>
          <p>
            Payments for lessons must be made through the platform's secure payment system. Lessons should be booked and attended according to the agreed schedule.
          </p>
          <p className="font-semibold">
            Refund Policy: Strict No Refunds once payment is made. All transactions are final.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">4. Verification</h2>
          <p>
            Tutors are manually verified. However, parents and students are encouraged to review tutor profiles and conduct free trial sessions to ensure a good match.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">5. Limitation of Liability</h2>
          <p>
            Aspire Academic Co. provides a marketplace platform and is not responsible for the specific content of individual tutoring sessions, though we monitor for safety and quality.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">6. Lesson Attendance & No-Show Policy</h2>
          <p>
            Our attendance policy ensures fairness and commitment for both students and tutors:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Makeup Sessions:</strong> Students who miss a scheduled lesson may request a makeup session, which is granted at the Tutor's sole discretion.
            </li>
            <li>
              <strong>Lesson Confirmation:</strong> Both parties must confirm lesson attendance via the platform post-session.
            </li>
            <li>
              <strong>No-Show Rule:</strong> If a student misses a lesson without notice, the tutor is paid in full. If a tutor misses a lesson, the student receives a platform credit to rebook.
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
