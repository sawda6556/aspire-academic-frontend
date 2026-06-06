import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo/logo.svg"
              alt="Aspire Academic Co."
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/how-it-works" className="text-sm font-medium text-muted hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/subjects" className="text-sm font-medium text-muted hover:text-primary transition-colors">
            Subjects
          </Link>
          <Link href="/tutors" className="text-sm font-medium text-muted hover:text-primary transition-colors">
            Find a Tutor
          </Link>
          <Link href="/become-tutor" className="text-sm font-medium text-muted hover:text-primary transition-colors">
            Become a Tutor
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:text-secondary transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
