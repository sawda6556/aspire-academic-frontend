import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  gender: 'MALE' | 'FEMALE';
  className?: string;
  size?: number;
}

export default function Avatar({ gender, className = '', size = 120 }: AvatarProps) {
  const src = gender === 'FEMALE' 
    ? '/assets/avatars/female-avatar.svg' 
    : '/assets/avatars/male-avatar.svg';

  return (
    <div 
      className={`relative rounded-full overflow-hidden border-2 border-primary bg-white ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`${gender} Avatar`}
        fill
        className="object-cover"
      />
    </div>
  );
}
