'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilterSidebar from '@/components/marketplace/FilterSidebar';
import TutorCard from '@/components/marketplace/TutorCard';
import TutorSkeleton from '@/components/marketplace/TutorSkeleton';

// Mock data for initial development/fallback
const MOCK_TUTORS = [
  {
    id: '1',
    full_name: 'Dr. Sarah Ahmed',
    country: 'United Kingdom',
    subjects: ['Mathematics', 'Physics'],
    hourly_rate: 35,
    avatar_url: '/assets/avatars/female-avatar-hijab.png',
    rating: 4.9,
  },
  {
    id: '2',
    full_name: 'Ahmed Mansour',
    country: 'Egypt',
    subjects: ['Arabic', 'Quran Studies'],
    hourly_rate: 25,
    avatar_url: '/assets/avatars/male-avatar.svg',
    rating: 4.8,
  },
  {
    id: '3',
    full_name: 'Fatima Al-Zahra',
    country: 'Canada',
    subjects: ['English', 'Islamic Studies'],
    hourly_rate: 30,
    avatar_url: '/assets/avatars/female-avatar-hijab.png',
    rating: 5.0,
  },
  {
    id: '4',
    full_name: 'Omar Farooq',
    country: 'USA',
    subjects: ['Computer Science', 'Math'],
    hourly_rate: 45,
    avatar_url: '/assets/avatars/male-avatar.svg',
    rating: 4.7,
  },
];

export default function TutorMarketplace() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTutors() {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/tutor-profiles/marketplace`);
        if (response.ok) {
          const data = await response.json();
          const displayData = data.length > 0 ? data : MOCK_TUTORS;
          setTutors(displayData);
          setFilteredTutors(displayData);
        } else {
          setTutors(MOCK_TUTORS);
          setFilteredTutors(MOCK_TUTORS);
        }
      } catch (err) {
        console.error('Failed to fetch tutors:', err);
        setTutors(MOCK_TUTORS);
        setFilteredTutors(MOCK_TUTORS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTutors();
  }, []);

  const handleFilterChange = (filters: any) => {
    let filtered = [...tutors];

    if (filters.category) {
      // Since subjects_v2 might not be in mock, we check subjects array or subjects_v2
      filtered = filtered.filter(tutor => 
        (tutor.subjects_v2 && tutor.subjects_v2.some((s: any) => s.category === filters.category)) ||
        (tutor.category === filters.category) // Fallback for simple structure
      );
    }

    if (filters.subject) {
      filtered = filtered.filter(tutor => 
        (tutor.subjects && tutor.subjects.includes(filters.subject)) ||
        (tutor.subjects_v2 && tutor.subjects_v2.some((s: any) => s.name === filters.subject))
      );
    }

    if (filters.level) {
      filtered = filtered.filter(tutor => 
        (tutor.subjects_v2 && tutor.subjects_v2.some((s: any) => s.level === filters.level))
      );
    }

    if (filters.country) {
      filtered = filtered.filter(tutor => tutor.country === filters.country);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(tutor => tutor.hourly_rate <= filters.maxPrice);
    }

    if (filters.minRating) {
      filtered = filtered.filter(tutor => (tutor.rating || 0) >= filters.minRating);
    }

    setFilteredTutors(filtered);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Find Your Perfect <span className="text-primary">Tutor</span>
            </h1>
            <p className="text-muted max-w-2xl">
              Browse through our community of verified, professional tutors committed to providing high-quality Islamic-friendly education.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Filter Sidebar */}
            <FilterSidebar onFilterChange={handleFilterChange} />

            {/* Tutor Grid */}
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted">
                  Showing <span className="font-semibold text-heading">{filteredTutors.length}</span> verified tutors
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Sort by:</span>
                  <select className="text-xs font-semibold text-heading bg-transparent border-none focus:ring-0 cursor-pointer">
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highest Rated</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <TutorSkeleton key={i} />
                  ))}
                </div>
              ) : filteredTutors.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTutors.map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-surface">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-heading mb-2">No tutors found</h3>
                  <p className="text-muted">Try adjusting your filters or searching for a different subject.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
