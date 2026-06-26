import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-pattern"></div>
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 sm:text-4xl">Ready to start your journey?</h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Whether you're looking for expert guidance for your children or you're a qualified tutor ready to share your knowledge, Aspire Academic Co. provides the platform you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup?type=student"
                className="rounded-xl bg-gold px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-gold/90 transition-all hover:scale-105"
              >
                Find a Tutor
              </Link>
              <Link
                href="/signup?type=tutor"
                className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-lg hover:bg-surface transition-all hover:scale-105"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            {/* Simple graphic or illustration placeholder */}
            <div className="relative h-72 w-72">
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-gold/30 blur-2xl animate-pulse" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
              <div className="relative h-full w-full rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-7xl shadow-2xl">
                🎓
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
