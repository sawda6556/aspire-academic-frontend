'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  
  const [formData, setPayload] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl ring-1 ring-surface">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-heading">Welcome Back</h1>
        {registered && (
          <p className="mt-2 text-sm text-teal font-medium">Registration successful! Please log in.</p>
        )}
        {!registered && <p className="mt-2 text-sm text-muted">Log in to your Aspire Academic account</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border"
          />
        </div>

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-muted">
          Don't have an account?{' '}
          <Link href="/signup" className="font-bold text-primary hover:underline">
            Sign up here
          </Link>
        </p>
        <p className="text-xs text-muted hover:underline cursor-pointer">
          Forgot your password?
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">Loading login form...</p>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
