import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RefundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-heading mb-10">Refund and Cancellation Policy</h1>
        <div className="prose prose-slate max-w-none text-muted space-y-6 leading-relaxed">
          <p className="text-sm">Last updated: June 2026</p>
          <p>
            At Aspire Academic Co., we strive to provide a fair and transparent environment for both our tutors and students. This Refund and Cancellation Policy outlines the rules regarding lesson bookings, cancellations, and no-shows on our platform.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">1. General Principles</h2>
          <p>
            Aspire Academic Co. operates an agency model, facilitating direct contracts between Tutors and Students/Parents. Once a lesson is booked and payment is processed, the following rules apply to ensure the commitment of both parties.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">2. No Cash Refunds</h2>
          <p className="font-semibold">
            All payments made through the Aspire Academic Co. platform are final.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We maintain a strict <strong>No Cash Refunds</strong> policy once a booking has been confirmed and paid for.
            </li>
            <li>
              This policy ensures that tutors can manage their schedules with confidence and that platform resources are used efficiently.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-heading mt-10">3. Student Cancellations and No-Shows</h2>
          <p>
            We understand that emergencies happen; however, tutors reserve their time specifically for each student.
          </p>
          <h3 className="text-xl font-bold text-heading mt-6">3.1 Student No-Show</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              If a student fails to attend a scheduled lesson without prior notice, the <strong>tutor will be paid in full</strong>.
            </li>
            <li>
              The student will not be entitled to a refund or an automatic credit for the missed session.
            </li>
          </ul>
          <h3 className="text-xl font-bold text-heading mt-6">3.2 Student Cancellation</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              If a student needs to cancel a lesson, they must notify the tutor via the platform's messaging system.
            </li>
            <li>
              Cancellations made by students do not trigger a cash refund.
            </li>
          </ul>
          <h3 className="text-xl font-bold text-heading mt-6">3.3 Makeup Lessons (Tutor Discretion)</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Granting a makeup lesson for a session missed by a student is at the <strong>sole discretion of the Tutor</strong>.
            </li>
            <li>
              If a tutor agrees to provide a makeup lesson, the new time and date must be mutually agreed upon via the platform.
            </li>
            <li>
              Aspire Academic Co. is not responsible for facilitating makeup lessons beyond providing the communication tools.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-heading mt-10">4. Tutor Cancellations and No-Shows</h2>
          <p>
            We expect our tutors to maintain the highest standards of professionalism and punctuality.
          </p>
          <h3 className="text-xl font-bold text-heading mt-6">4.1 Tutor No-Show</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              If a tutor fails to attend a scheduled lesson, the student is entitled to a <strong>Platform Lesson Credit</strong>.
            </li>
            <li>
              This credit can be used to rebook the lesson with the same tutor or another tutor on the platform.
            </li>
            <li>
              No cash refund will be issued; the value is held as a credit for future use.
            </li>
          </ul>
          <h3 className="text-xl font-bold text-heading mt-6">4.2 Tutor Cancellation</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              If a tutor must cancel a lesson due to unforeseen circumstances, they must notify the student/parent as soon as possible.
            </li>
            <li>
              In the event of a tutor-initiated cancellation, the student will receive a <strong>Platform Lesson Credit</strong> for the full value of the session.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-heading mt-10">5. Dispute Resolution</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Both tutors and students are required to confirm attendance via the platform post-session.
            </li>
            <li>
              If there is a dispute regarding attendance or the conduct of a lesson, users should contact <a href="mailto:info@aspireacademicco.co.uk" className="text-primary hover:underline">info@aspireacademicco.co.uk</a> within 48 hours of the scheduled lesson time.
            </li>
            <li>
              Aspire Academic Co. will review the platform logs and messaging history to reach a fair resolution. Our decision in such matters is final.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-heading mt-10">6. Educational Resources</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Due to the nature of digital products, all sales in the Educational Resource Store are <strong>final and non-refundable</strong>.
            </li>
            <li>
              If you experience technical issues downloading a resource, please contact support for assistance.
            </li>
          </ul>

          <div className="mt-12 pt-8 border-t border-muted/20 text-sm italic">
            By booking a lesson on Aspire Academic Co., you acknowledge that you have read, understood, and agreed to this Refund and Cancellation Policy.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
