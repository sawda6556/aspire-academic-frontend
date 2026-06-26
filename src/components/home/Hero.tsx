import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted ring-1 ring-surface hover:ring-primary/20 transition-all bg-white/50 backdrop-blur-sm">
              Welcome to our growing educational community{' '}
              <Link href="/about" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Read our story <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-heading sm:text-6xl">
            Safe, Professional <span className="text-primary">Islamic-Friendly</span> Tutoring
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted max-w-3xl mx-auto">
            Aspire Academic Co. connects parents, students, and verified tutors for a safe and professional online learning experience built on Islamic values.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/tutors"
              className="rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gold/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Find a Tutor
            </Link>
            <Link
              href="/become-tutor"
              className="text-base font-semibold leading-7 text-primary hover:text-secondary transition-colors"
            >
              Become a Tutor <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Search placeholder */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="flex items-center rounded-xl bg-white p-2 shadow-lg ring-1 ring-surface">
            <input
              type="text"
              placeholder="What subject do you want to learn?"
              className="block w-full border-0 bg-transparent py-3 px-4 text-heading placeholder:text-muted focus:ring-0 sm:text-sm"
            />
            <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-xs text-muted">Popular:</span>
            {['Math', 'English', 'Science', 'Quran', 'Arabic'].map((tag) => (
              <span key={tag} className="text-xs font-medium text-primary hover:underline cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
