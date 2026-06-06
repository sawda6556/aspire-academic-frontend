'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  initialFilters: any;
}

const grades = ['Primary', 'Secondary', 'GCSE', 'A-Level', 'University', 'All Ages'];

export default function FilterSidebar({ onFilterChange, initialFilters }: FilterSidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');
  const [selectedSubject, setSelectedSubject] = useState(initialFilters.subject || '');
  const [selectedGrade, setSelectedGrade] = useState(initialFilters.grade || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.max_price || 100);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(`${apiUrl}/resources/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to load categories', err));

    fetch(`${apiUrl}/subjects`)
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => console.error('Failed to load subjects', err));
  }, [apiUrl]);

  useEffect(() => {
    setSelectedCategory(initialFilters.category || '');
  }, [initialFilters.category]);

  const handleFilterChange = (newFilters: any) => {
    const filters = {
      category: selectedCategory,
      subject: selectedSubject,
      grade: selectedGrade,
      max_price: maxPrice,
      ...newFilters
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSubject('');
    setSelectedGrade('');
    setMaxPrice(100);
    onFilterChange({});
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      <div>
        <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Category</h3>
        <select 
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleFilterChange({ category: e.target.value });
          }}
          className="w-full rounded-lg border-gray-200 bg-white text-sm text-muted focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
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
          className="w-full rounded-lg border-gray-200 bg-white text-sm text-muted focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Grade Level</h3>
        <select 
          value={selectedGrade}
          onChange={(e) => {
            setSelectedGrade(e.target.value);
            handleFilterChange({ grade: e.target.value });
          }}
          className="w-full rounded-lg border-gray-200 bg-white text-sm text-muted focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Levels</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-heading uppercase tracking-wider">Max Price</h3>
          <span className="text-sm font-bold text-primary">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="5"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(parseInt(e.target.value));
          }}
          onMouseUp={() => handleFilterChange({ max_price: maxPrice })}
          onTouchEnd={() => handleFilterChange({ max_price: maxPrice })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between mt-2 text-[10px] text-muted">
          <span>$0</span>
          <span>$200+</span>
        </div>
      </div>

      <button 
        onClick={clearFilters}
        className="w-full py-3 rounded-lg bg-gray-100 text-heading text-sm font-bold hover:bg-gray-200 transition-colors"
      >
        Clear All Filters
      </button>
    </aside>
  );
}
