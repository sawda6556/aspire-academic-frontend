'use client';

import { useState, useEffect } from 'react';

interface Subject {
  id: string;
  name: string;
  category: string;
  level: string;
}

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

const countries = ['United Kingdom', 'USA', 'Canada', 'Saudi Arabia', 'Egypt', 'UAE', 'Pakistan', 'International'];

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [priceRange, setPriceRange] = useState(100);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/subjects`)
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
        const cats = Array.from(new Set(data.map((s: any) => s.category))) as string[];
        const levs = Array.from(new Set(data.map((s: any) => s.level))) as string[];
        setCategories(cats);
        setLevels(levs);
      })
      .catch(err => console.error('Failed to load subjects', err));
  }, []);

  const handleFilterChange = (newFilters: any) => {
    onFilterChange({
      category: selectedCategory,
      subject: selectedSubject,
      level: selectedLevel,
      country: selectedCountry,
      maxPrice: priceRange,
      minRating: selectedRating,
      availability: selectedAvailability,
      ...newFilters
    });
  };

  const toggleAvailability = (time: string) => {
    const newAvail = selectedAvailability.includes(time)
      ? selectedAvailability.filter(a => a !== time)
      : [...selectedAvailability, time];
    setSelectedAvailability(newAvail);
    handleFilterChange({ availability: newAvail });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSubject('');
    setSelectedLevel('');
    setSelectedCountry('');
    setPriceRange(200);
    setSelectedRating(0);
    setSelectedAvailability([]);
    onFilterChange({});
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      <div>
        <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Subject Category</h3>
        <select 
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubject('');
            handleFilterChange({ category: e.target.value, subject: '' });
          }}
          className="w-full rounded-lg border-surface bg-white text-sm text-muted focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Subject</h3>
        <select 
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            handleFilterChange({ subject: e.target.value });
          }}
          className="w-full rounded-lg border-surface bg-white text-sm text-muted focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Subjects</option>
          {subjects
            .filter(s => !selectedCategory || s.category === selectedCategory)
            .map((subject) => (
              <option key={subject.id} value={subject.name}>{subject.name}</option>
            ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Level</h3>
        <select 
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value);
            handleFilterChange({ level: e.target.value });
          }}
          className="w-full rounded-lg border-surface bg-white text-sm text-muted focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Levels</option>
          {levels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Country</h3>
        <select 
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            handleFilterChange({ country: e.target.value });
          }}
          className="w-full rounded-lg border-surface bg-white text-sm text-muted focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-heading uppercase tracking-wider">Max Price</h3>
          <span className="text-sm font-bold text-primary">${priceRange}/hr</span>
        </div>
        <input
          type="range"
          min="10"
          max="200"
          step="5"
          value={priceRange}
          onChange={(e) => {
            setPriceRange(parseInt(e.target.value));
            handleFilterChange({ maxPrice: parseInt(e.target.value) });
          }}
          className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between mt-2 text-[10px] text-muted">
          <span>$10</span>
          <span>$200</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Minimum Rating</h3>
        <div className="flex gap-1">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => {
                setSelectedRating(rating);
                handleFilterChange({ minRating: rating });
              }}
              className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                selectedRating === rating 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-surface text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {rating}+ ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Availability</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Weekdays', 'Weekends', 'Morning', 'Evening'].map((time) => (
            <button
              key={time}
              onClick={() => toggleAvailability(time)}
              className={`py-2 rounded-lg border text-[10px] font-medium transition-all text-center ${
                selectedAvailability.includes(time)
                  ? 'bg-primary text-white border-primary'
                  : 'border-surface text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={clearFilters}
        className="w-full py-3 rounded-lg bg-surface text-heading text-sm font-bold hover:bg-surface/80 transition-colors"
      >
        Clear All Filters
      </button>
    </aside>
  );
}
