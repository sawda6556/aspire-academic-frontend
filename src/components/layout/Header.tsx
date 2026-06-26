'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image
              src="/assets/logo/official_logo.png"
              alt="Aspire Academic Co."
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/how-it-works" className="text-sm font-bold text-muted hover:text-gold transition-colors">
            How It Works
          </Link>
          <Link href="/subjects" className="text-sm font-bold text-muted hover:text-gold transition-colors">
            Subjects
          </Link>
          <Link href="/tutors" className="text-sm font-bold text-muted hover:text-gold transition-colors">
            Find a Tutor
          </Link>
          <Link href="/become-tutor" className="text-sm font-bold text-muted hover:text-gold transition-colors">
            Become a Tutor
          </Link>
          <Link href="/about" className="text-sm font-bold text-muted hover:text-gold transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-bold text-primary hover:text-gold transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-sm font-bold text-muted hover:text-gold transition-colors"
              >
                Logout
              </button>
              <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-gold/20 bg-surface relative shadow-sm">
                 <Image
                    src={user.avatar_url || '/assets/avatars/male-avatar.svg'}
                    alt={user.full_name}
                    fill
                    className="object-cover"
                 />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-primary hover:text-gold transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-white hover:bg-gold/90 transition-all hover:scale-105 shadow-md shadow-gold/10"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
