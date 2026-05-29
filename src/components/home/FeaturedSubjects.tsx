const subjects = [
  { name: 'Mathematics', icon: '📐', count: '120+ Tutors' },
  { name: 'English Language', icon: '📚', count: '85+ Tutors' },
  { name: 'Islamic Studies', icon: '🕌', count: '45+ Tutors' },
  { name: 'Sciences', icon: '🔬', count: '60+ Tutors' },
  { name: 'Arabic Language', icon: '✍️', count: '50+ Tutors' },
  { name: 'Quran Studies', icon: '📖', count: '40+ Tutors' },
  { name: 'History', icon: '🏺', count: '25+ Tutors' },
  { name: 'Computer Science', icon: '💻', count: '35+ Tutors' },
];

export default function FeaturedSubjects() {
  return (
    <section className="bg-surface/30 py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-heading">Explore Popular Subjects</h2>
          <p className="mt-4 text-muted">Find expert tutors across various academic and Islamic subjects.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="group relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{subject.icon}</div>
              <h3 className="text-lg font-semibold text-heading group-hover:text-primary transition-colors">
                {subject.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{subject.count}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="text-primary font-semibold hover:text-secondary transition-colors">
            View all subjects &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
