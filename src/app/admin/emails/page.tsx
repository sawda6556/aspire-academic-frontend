'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AdminEmailsPage() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/admin/send-email`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is in localStorage
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send email');
      }

      setStatus('success');
      setFormData({ to: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-heading mb-8">Admin: Send Direct Email</h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface">
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
              Email sent successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-heading mb-2">Recipient Email</label>
              <input
                type="email"
                name="to"
                required
                value={formData.to}
                onChange={handleChange}
                className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-3 px-4 border"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-3 px-4 border"
                placeholder="Important update regarding your account"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={10}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-3 px-4 border"
                placeholder="Enter your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary py-4 text-sm font-bold text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Email'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
