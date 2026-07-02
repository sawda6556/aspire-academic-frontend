'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Aspire Academic Co.?",
        a: "Aspire Academic Co. is an Islamic-friendly online tutoring marketplace connecting parents, students over 18, and verified tutors. We focus on providing a safe, professional, and privacy-respecting environment for quality education."
      },
      {
        q: "Why don't I see any real profile photos?",
        a: "To maintain privacy and adhere to Islamic-friendly standards, we do not allow real profile photos. Instead, every user is assigned a modest, minimal illustration avatar based on their gender."
      }
    ]
  },
  {
    category: "Privacy & Safety",
    questions: [
      {
        q: "How are tutors verified?",
        a: "Every tutor must undergo a manual verification process. We review their government-issued identity documents, educational certificates, and professional background before they are allowed to teach on the platform."
      },
      {
        q: "Is my data safe?",
        a: "Yes. We take data security seriously and follow UK GDPR compliance standards. Your personal information and documents are stored securely and only accessible to authorized administrators for verification purposes."
      }
    ]
  },
  {
    category: "For Parents & Students",
    questions: [
      {
        q: "How do I book a lesson?",
        a: "Once you find a tutor you like, you can view their availability on their profile and book a session directly. You'll receive a confirmation and a link to the secure video session."
      },
      {
        q: "Can I have a trial lesson?",
        a: "Many of our tutors offer a free 10-minute trial lesson. This is a great way to meet the tutor, discuss your goals, and see if they are a good match for your learning style."
      }
    ]
  },
  {
    category: "Payments & Fees",
    questions: [
      {
        q: "How much do lessons cost?",
        a: "Tutors set their own hourly rates, typically ranging from £15 to £60 per hour. The price you see on the tutor's profile is the total price you pay."
      },
      {
        q: "Are there any hidden fees?",
        a: "No. We believe in transparency. The lesson price includes all platform service fees and payment processing costs. There are no surprise charges."
      }
    ]
  },
  {
    category: "Refunds & Attendance",
    questions: [
      {
        q: "What is your refund policy?",
        a: "We maintain a strict No Cash Refunds policy. All payments made through the Aspire Academic Co. platform are final. This ensures that tutors can manage their schedules with confidence and platform resources are used efficiently."
      },
      {
        q: "What happens if a student misses a scheduled lesson?",
        a: "If a student fails to attend a scheduled lesson without notice (student no-show), the tutor will be paid in full. The student is not entitled to a refund or automatic credit. Providing a makeup lesson is at the sole discretion of the tutor."
      },
      {
        q: "What happens if a tutor misses a scheduled lesson?",
        a: "If a tutor fails to attend a scheduled lesson (tutor no-show), the student will receive a Platform Lesson Credit. This credit can be used to rebook the lesson with the same tutor or another tutor on the platform. No cash refund will be issued."
      },
      {
        q: "Do we need to confirm lesson attendance?",
        a: "Yes. Both parties must confirm lesson attendance via the platform post-session. If there is a dispute regarding attendance, please contact info@aspireacademicco.co.uk within 48 hours of the scheduled lesson time."
      },
      {
        q: "Are digital downloads from the Resource Store refundable?",
        a: "Due to the nature of digital products, all sales in the Educational Resource Store are final and non-refundable. If you experience technical download issues, please contact our support team."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const id = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-heading mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted">Everything you need to know about Aspire Academic Co.</p>
        </div>

        <div className="space-y-12">
          {faqs.map((category, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-2xl font-bold text-primary mb-6 border-b border-surface pb-2">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIdx) => {
                  const isOpen = openIndex === `${catIdx}-${qIdx}`;
                  return (
                    <div 
                      key={qIdx} 
                      className="bg-white rounded-xl shadow-sm ring-1 ring-surface overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleFAQ(catIdx, qIdx)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-surface/10 transition-colors"
                      >
                        <span className="font-semibold text-heading pr-8">{faq.q}</span>
                        <span className={`text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      <div 
                        className={`px-5 transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-muted leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-primary/5 rounded-3xl p-10 text-center border border-primary/10">
          <h2 className="text-2xl font-bold text-heading mb-4">Still have questions?</h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            If you couldn't find the answer you're looking for, please feel free to reach out to our support team.
          </p>
          <a 
            href="/contact" 
            className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-sm"
          >
            Contact Support
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
