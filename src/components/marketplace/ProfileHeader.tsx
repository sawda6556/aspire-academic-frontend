import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfileHeaderProps {
  tutor: {
    id: string;
    full_name: string;
    country: string;
    avatar_url?: string;
    rating?: number;
    review_count?: number;
    verification_status?: string;
    dbs_verified_status?: string;
  };
}

export default function ProfileHeader({ tutor }: ProfileHeaderProps) {
  const router = useRouter();
  const rating = tutor.rating || 4.9;
  const reviewCount = tutor.review_count || 124;
  const isVerified = tutor.verification_status === 'APPROVED';

  const handleMessage = () => {
    router.push(`/messages?tutorId=${tutor.id}`);
  };

  const handleBookTrial = () => {
    router.push(`/book/${tutor.id}?trial=true`);
  };

  const handleBookLesson = () => {
    router.push(`/book/${tutor.id}`);
  };

  return (
    <section className="bg-white border-b border-surface">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
          {/* Large Avatar */}
          <div className="relative h-40 w-40 sm:h-56 sm:w-56 lg:h-72 lg:w-72 rounded-full overflow-hidden border-4 border-surface shadow-lg">
            <Image
              src={tutor.avatar_url || '/assets/avatars/male-avatar.svg'}
              alt={tutor.full_name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info & Actions */}
          <div className="flex-grow flex flex-col justify-center">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-heading">{tutor.full_name}</h1>
              {isVerified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">
                  <span>✓</span>
                  <span>Verified</span>
                </span>
              )}
              {tutor.dbs_verified_status === 'VERIFIED' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">
                  <span>🛡️</span>
                  <span>DBS Verified</span>
                </span>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 text-muted mb-6">
              <span className="flex items-center gap-1">
                <span className="text-lg">📍</span> {tutor.country || 'International'}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted opacity-30" />
              <div className="flex items-center gap-1.5">
                <span className="text-gold text-xl">★</span>
                <span className="font-bold text-heading text-lg">{rating.toFixed(1)}</span>
                <span className="text-sm">({reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button 
                onClick={handleMessage}
                className="rounded-lg border-2 border-primary bg-white px-8 py-3 text-sm font-bold text-primary hover:bg-surface transition-colors"
              >
                Message
              </button>
              <button 
                onClick={handleBookTrial}
                className="rounded-lg bg-gold px-8 py-3 text-sm font-bold text-white hover:bg-gold/90 transition-colors"
              >
                Book Trial
              </button>
              <button 
                onClick={handleBookLesson}
                className="rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
              >
                Book Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
