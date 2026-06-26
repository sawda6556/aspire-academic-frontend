export default function Mission() {
  const values = [
    {
      title: "Privacy First",
      description: "No real photos. Your identity is protected always.",
      icon: "🛡️",
    },
    {
      title: "Family-Friendly",
      description: "Modest environment. Gender-appropriate interactions.",
      icon: "❤️",
    },
    {
      title: "Verified Tutors",
      description: "All tutors are manually verified by our team.",
      icon: "✅",
    },
    {
      title: "Professional Excellence",
      description: "Quality resources and professional teaching.",
      icon: "⭐",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden bg-pattern">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-surface/50 rounded-[2.5rem] p-8 md:p-16 mb-16 text-center max-w-4xl mx-auto ring-1 ring-gold/10 shadow-lg">
          <div className="text-gold text-5xl mb-6">📚</div>
          <h2 className="text-3xl font-bold mb-8 text-heading sm:text-4xl">Our Mission</h2>
          <p className="text-xl text-muted leading-relaxed font-medium italic">
            "Created by an educated female Muslim who is looking to support people's education. We provide a safe, professional learning environment where students can grow academically while maintaining their Islamic values and family principles."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-md ring-1 ring-surface text-center transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl mb-6">{value.icon}</div>
              <h3 className="text-lg font-bold text-heading mb-3">{value.title}</h3>
              <p className="text-sm text-muted leading-relaxed font-medium">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
