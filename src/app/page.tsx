import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedSubjects from '@/components/home/FeaturedSubjects';
import Mission from '@/components/home/Mission';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorks from '@/components/home/HowItWorks';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <FeaturedSubjects />

        <Mission />
        
        <FeaturesSection />

        <HowItWorks />
        
        {/* Simple Testimonials Section based on Mockups */}
        <section className="py-24 bg-surface/20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-heading">What Our Community Says</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "Finding a tutor who understands our values was so important. Aspire Academic made it easy and safe.",
                  author: "Parent from UK",
                },
                {
                  quote: "The platform is professional and the quality of tutors is exceptional. Highly recommended!",
                  author: "University Student",
                },
                {
                  quote: "As a tutor, I appreciate the respectful environment and the smooth booking system.",
                  author: "Verified Tutor",
                },
              ].map((testimonial, i) => (
                <div key={i} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-surface italic">
                  <p className="text-muted mb-6">"{testimonial.quote}"</p>
                  <p className="text-sm font-semibold text-primary not-italic">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
