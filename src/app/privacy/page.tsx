import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-heading mb-10">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-muted space-y-6 leading-relaxed">
          <p>Last updated: May 2026</p>
          <p>
            At Aspire Academic Co., your privacy is our top priority. Our platform is designed from the ground up to protect the identity and personal data of our students, parents, and tutors.
          </p>
          
          <h2 className="text-2xl font-bold text-heading mt-10">1. No Real Profile Photos</h2>
          <p>
            To maintain privacy and adhere to Islamic-friendly standards, we do not allow real profile photos of any users. Instead, we use automatically assigned avatars that indicate gender while maintaining complete facial privacy.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">2. Data Collection & Use</h2>
          <p>
            We collect information necessary for the operation of the tutoring marketplace, including names, contact details, and for tutors, identity and qualification documents. This data is used solely for verification and service delivery.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">3. Safe Communication</h2>
          <p>
            All messaging between students/parents and tutors takes place within our secure internal messaging system. We monitor interactions to ensure safeguarding standards are maintained.
          </p>

          <h2 className="text-2xl font-bold text-heading mt-10">4. Your Rights</h2>
          <p>
            As a user of our platform, you have the right to access, correct, or delete your personal data. We comply with UK GDPR and other relevant data protection regulations.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
