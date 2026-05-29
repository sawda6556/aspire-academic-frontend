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
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-heading">How It Works</h2>
          <p className="mt-4 text-muted">Your journey to academic success in 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-2/3 w-full border-t-2 border-dashed border-surface" />
              )}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/5 text-4xl mb-6 ring-1 ring-primary/10">
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
