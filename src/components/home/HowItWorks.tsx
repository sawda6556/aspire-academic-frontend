const steps = [
  {
    title: 'Create an Account',
    description: 'Sign up as a parent, student, or tutor. Complete your profile in minutes.',
    icon: '👤',
  },
  {
    title: 'Find Your Perfect Tutor',
    description: 'Browse verified tutors by subject, price, and availability. Book a free trial lesson.',
    icon: '🔍',
  },
  {
    title: 'Start Learning Online',
    description: 'Join secure one-to-one video sessions. Access high-quality educational resources.',
    icon: '✨',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-muted text-lg">Your journey to academic success in 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group text-center p-8 rounded-3xl bg-white/50 shadow-sm hover:shadow-md transition-all">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 border-t-2 border-dashed border-gold/30" />
              )}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gold/10 text-4xl mb-6 ring-1 ring-gold/20 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-heading mb-2">{step.title}</h3>
              <p className="text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
