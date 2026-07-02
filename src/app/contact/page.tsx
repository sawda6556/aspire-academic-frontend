'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-heading mb-4">Contact Us</h1>
          <p className="text-lg text-muted">We'd love to hear from you</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <div className="w-full lg:w-1/3 bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface h-fit">
            <h2 className="text-xl font-semibold text-heading mb-6">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <span className="text-primary text-2xl">📧</span>
                <div>
                  <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-1">Primary Support Email</h3>
                  <p className="text-muted">
                    <a href="mailto:info@aspireacademicco.co.uk" className="hover:text-primary transition-colors font-semibold">
                      info@aspireacademicco.co.uk
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-primary text-2xl">📍</span>
                <div>
                  <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-1">Location</h3>
                  <p className="text-muted text-sm">Online Platform Only</p>
                  <p className="text-muted text-xs">Secure messaging available</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-primary text-2xl">⏰</span>
                <div>
                  <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-1">Response Time</h3>
                  <p className="text-muted text-sm">Within 24-48 hours</p>
                  <p className="text-muted text-xs">Monday - Friday</p>
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary">🛡️</span>
                  <h3 className="text-sm font-bold text-heading">Privacy Notice</h3>
                </div>
                <p className="text-muted text-xs leading-relaxed">
                  Your information is protected and never shared with third parties.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-grow bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-6">✅</div>
                <h2 className="text-2xl font-bold text-heading mb-4">Message Sent!</h2>
                <p className="text-muted mb-8">
                  Thank you for reaching out. We'll respond within 24-48 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-heading mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-3 px-4 border"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-heading mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-3 px-4 border"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-heading mb-2">
                    Message <span className="text-coral">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-3 px-4 border resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                  <p className="text-[10px] text-muted mt-1">* Required field</p>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-coral/10 border-l-4 border-coral text-coral text-sm">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-primary py-4 text-sm font-bold text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 text-center bg-surface/30 p-12 rounded-3xl">
          <div className="text-3xl mb-4">💬</div>
          <h2 className="text-xl font-bold text-heading mb-2">Have questions?</h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            Visit our FAQ page for answers to common questions about lessons, tutoring, and more.
          </p>
          <button className="rounded-lg border-2 border-primary bg-transparent px-8 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors">
            Visit FAQ
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
