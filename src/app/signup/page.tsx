import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const accountTypes = [
  {
    id: 'tutor',
    title: 'Tutor',
    description: 'Professional, verified tutors ready to teach online.',
    icon: '👩‍🏫',
    href: '/signup/tutor',
    color: 'bg-primary',
  },
  {
    id: 'parent',
    title: 'Parent',
    description: 'Safe and secure learning for your children.',
    icon: '👨‍👩‍👧',
    href: '/signup/parent',
    color: 'bg-secondary',
  },
  {
    id: 'student',
    title: 'Student (18+)',
    description: 'Independent learners looking for academic excellence.',
    icon: '🎓',
    href: '/signup/student',
    color: 'bg-teal',
  },
];

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-heading mb-4">Join Aspire Academic Co.</h1>
            <p className="text-lg text-muted">Choose your account type to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accountTypes.map((type) => (
              <Link
                key={type.id}
                href={type.href}
                className="group relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm ring-1 ring-surface transition-all hover:shadow-xl hover:-translate-y-2 hover:ring-primary/20"
              >
                <div className={`h-20 w-20 flex items-center justify-center rounded-2xl text-4xl mb-6 ${type.color} text-white group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>
                <h2 className="text-2xl font-bold text-heading mb-3">{type.title}</h2>
                <p className="text-center text-muted text-sm leading-relaxed">
                  {type.description}
                </p>
                
                <div className="mt-8 px-6 py-2 rounded-full bg-surface text-primary text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                  Join as {type.title}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-primary hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
