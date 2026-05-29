import Image from 'next/image';
import Link from 'next/link';

interface TutorCardProps {
  tutor: {
    id: string;
    full_name: string;
    country: string;
    subjects: string[];
    hourly_rate: number;
    avatar_url?: string;
    rating?: number;
    dbs_verified_status?: string;
  };
}

export default function TutorCard({ tutor }: TutorCardProps) {
  const rating = tutor.rating || 4.9; // Default for mockup purposes
  
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-surface">
          <Image
            src={tutor.avatar_url || '/assets/avatars/male-avatar.svg'}
            alt={tutor.full_name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold">
          <span>★</span>
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="text-lg font-bold text-heading leading-tight">{tutor.full_name}</h3>
          <span className="text-gold text-sm" title="Verified Tutor">✓</span>
          {tutor.dbs_verified_status === 'VERIFIED' && (
            <span className="flex items-center gap-0.5 rounded bg-teal/10 px-1.5 py-0.5 text-[9px] font-bold text-teal ring-1 ring-teal/20 ml-1">
              <span className="text-[10px]">🛡️</span> DBS Verified
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-muted text-xs mb-3">
          <span className="text-base">📍</span>
          <span>{tutor.country || 'International'}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {((tutor as any).subjects_v2 ? (tutor as any).subjects_v2.map((s: any) => s.name) : tutor.subjects || ['General Studies']).slice(0, 3).map((subject: string) => (
            <span
              key={subject}
              className="rounded-md bg-secondary/10 px-2 py-0.5 text-[10px] font-medium text-secondary"
            >
              {subject}
            </span>
          ))}
          {((tutor as any).subjects_v2?.length > 3 || (tutor.subjects?.length > 3)) && (
            <span className="text-[10px] text-muted self-center">
              +{(tutor as any).subjects_v2 ? (tutor as any).subjects_v2.length - 3 : tutor.subjects.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-surface flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-primary">${tutor.hourly_rate || 20}</span>
          <span className="text-xs text-muted ml-1">/ hour</span>
        </div>
        <Link
          href={`/tutors/${tutor.id}`}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
