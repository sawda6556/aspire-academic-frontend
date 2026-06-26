import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ResourceCardProps {
  id: string;
  title: string;
  tutorName: string;
  tutorAvatar: string;
  price: number;
  rating: number;
  reviewCount: number;
  previewUrl: string;
  gradeLevel: string;
  category?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  title,
  tutorName,
  tutorAvatar,
  price,
  rating,
  reviewCount,
  previewUrl,
  gradeLevel,
  category,
}) => {
  return (
    <Link href={`/store/${id}`}>
      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-surface group hover:-translate-y-1">
        {/* Preview Image */}
        <div className="relative aspect-[16/10] bg-surface">
          <Image
            src={previewUrl || '/assets/placeholder-resource.jpg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-primary shadow-sm">
            {gradeLevel}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-heading font-bold text-base mb-2 line-clamp-2 min-h-[3rem] group-hover:text-gold transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-surface">
              <Image
                src={tutorAvatar || '/assets/avatars/male-avatar.svg'}
                alt={tutorName}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-muted font-medium truncate">By {tutorName}</span>
          </div>

          <div className="flex items-center gap-1 mb-5">
            <span className="text-gold text-xs">★</span>
            <span className="text-xs font-bold text-heading">{rating}</span>
            <span className="text-[10px] text-muted font-medium">({reviewCount} reviews)</span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-heading">
              {price === 0 ? 'Free' : `£${price.toFixed(2)}`}
            </span>
            <button className="bg-gold text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-gold/90 transition-all active:scale-95">
              View details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
