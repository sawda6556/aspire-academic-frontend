import Link from 'next/link';

const studentFeatures = [
  {
    title: 'Trust & Safety',
    items: ['Access to DBS-Verified tutors.', 'Secure, encrypted platform.'],
    icon: '🛡️',
  },
  {
    title: 'Learning',
    items: ['10-minute Free Trial per tutor.', 'Personalized 1-to-1 sessions.', 'Islamic-friendly environment.'],
    icon: '📚',
  },
  {
    title: 'Digital Products',
    items: ['Buy worksheets and PDFs.', 'Automated itemized receipts.'],
    icon: '📄',
  },
  {
    title: 'Management',
    items: ['Easy lesson booking calendar.', 'Payment history tracking.'],
    icon: '🗓️',
  },
];

const tutorFeatures = [
  {
    title: 'Trust & Safety',
    items: ['Profile verification badge.', 'Secure document upload (DBS/ID).'],
    icon: '✅',
  },
  {
    title: 'Teaching',
    items: ['Set your own hourly rates.', 'Manage teaching schedule.', 'Direct student messaging.'],
    icon: '👨‍🏫',
  },
  {
    title: 'Digital Products',
    items: ['Sell your own PDFs and resources.', 'Keep 85% of every sale.'],
    icon: '💰',
  },
  {
    title: 'Management',
    items: ['Professional tutor dashboard.', 'Automated earnings tracking.'],
    icon: '📊',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-surface/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-heading mb-4">Platform Features</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto italic">
            Tailored tools for a safe, productive, and values-aligned academic experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Students & Parents */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-surface/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary/10 p-3 rounded-2xl text-3xl">🎓</div>
              <h3 className="text-2xl font-bold text-primary">For Students & Parents</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {studentFeatures.map((f) => (
                <div key={f.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{f.icon}</span>
                    <h4 className="font-bold text-heading">{f.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {f.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tutors & Educators */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-surface/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-secondary/10 p-3 rounded-2xl text-3xl">💼</div>
              <h3 className="text-2xl font-bold text-secondary">For Tutors & Educators</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tutorFeatures.map((f) => (
                <div key={f.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{f.icon}</span>
                    <h4 className="font-bold text-heading">{f.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {f.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted flex items-start gap-2">
                        <span className="text-secondary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integrated Shop Info for Tutors */}
        <div className="mt-16 bg-primary text-white rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4">How Tutors Sell PDFs & Resources</h3>
              <p className="text-white/80 mb-6 text-lg">
                No separate website needed. Everything is integrated into your existing account.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { step: '1', text: 'Login at aspireacademicco.co.uk/login' },
                  { step: '2', text: 'Navigate to "My Resources" in your Dashboard' },
                  { step: '3', text: 'Upload your PDF, set a price and description' },
                  { step: '4', text: 'Click "Publish" and start earning (Keep 85%!)' },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold">
                      {s.step}
                    </span>
                    <span className="text-sm font-medium">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="text-9xl opacity-20">📄✨</div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
