import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-surface/50 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/assets/logo/logo.svg"
                alt="Aspire Academic Co."
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Safe, Professional Islamic-Friendly Tutoring. Connecting students with verified tutors for quality online education.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-heading mb-4 uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted hover:text-primary">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-muted hover:text-primary">How It Works</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted hover:text-primary">Pricing & Fees</Link></li>
              <li><Link href="/tutors" className="text-sm text-muted hover:text-primary">Find a Tutor</Link></li>
              <li><Link href="/become-tutor" className="text-sm text-muted hover:text-primary">Become a Tutor</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-heading mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-muted hover:text-primary">FAQs</Link></li>
              <li><Link href="/contact" className="text-sm text-muted hover:text-primary">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-heading mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-4">
              {/* Placeholder for social icons */}
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="sr-only">Facebook</span>
                {/* SVG Icon */}
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="sr-only">Twitter</span>
                {/* SVG Icon */}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-muted/10 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Aspire Academic Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
