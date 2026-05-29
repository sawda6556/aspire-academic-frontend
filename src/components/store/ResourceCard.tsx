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
}) => {
  return (
    <Link href={`/store/${id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 group">
        {/* Preview Image */}
        <div className="relative aspect-[16/10] bg-gray-100">
          <Image
            src={previewUrl || '/assets/placeholder-resource.jpg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary">
            {gradeLevel}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-gray-900 font-semibold text-base mb-1 line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={tutorAvatar || '/assets/avatars/male-avatar.svg'}
                alt={tutorName}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-gray-500 truncate">By {tutorName}</span>
          </div>

          <div className="flex items-center gap-1 mb-4">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-gray-900">
              {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
            </span>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
