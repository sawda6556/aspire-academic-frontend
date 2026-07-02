import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gold/10 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
            <Image
                src="/assets/logo/official_logo.png"
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
              <li><Link href="/refund" className="text-sm text-muted hover:text-primary">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-heading mb-4 uppercase tracking-wider">Contact & Connect</h3>
            <p className="text-sm text-muted mb-4">
              Have questions? Email us at:
              <a href="mailto:info@aspireacademicco.co.uk" className="text-primary hover:underline font-semibold block mt-1 break-all">
                info@aspireacademicco.co.uk
              </a>
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/aspireacademicco"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@aspireacademicco"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <span className="sr-only">TikTok</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </Link>
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
