'use client';

import React, { useState, useEffect } from 'react';

interface Subject {
  id: string;
  name: string;
  category: string;
}

interface SubjectSelectorProps {
  selectedSubjectIds: string[];
  onChange: (ids: string[]) => void;
  max?: number;
  min?: number;
}

export default function SubjectSelector({ selectedSubjectIds, onChange, max = 3, min = 1 }: SubjectSelectorProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/subjects`)
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load subjects');
        setLoading(false);
      });
  }, []);

  const toggleSubject = (id: string) => {
    if (selectedSubjectIds.includes(id)) {
      onChange(selectedSubjectIds.filter(sid => sid !== id));
    } else {
      if (selectedSubjectIds.length < max) {
        onChange([...selectedSubjectIds, id]);
      }
    }
  };

  if (loading) return <div>Loading subjects...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const categories = Array.from(new Set(subjects.map(s => s.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-muted">
          Select Subjects (min {min}, max {max})
        </label>
        <span className="text-xs text-muted">
          {selectedSubjectIds.length} / {max} selected
        </span>
      </div>
      
      <div className="max-h-64 overflow-y-auto space-y-4 border border-surface rounded-lg p-4">
        {categories.map(category => (
          <div key={category}>
            <h4 className="text-xs font-bold uppercase text-primary/60 mb-2">{category}</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {subjects
                .filter(s => s.category === category)
                .map(subject => (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => toggleSubject(subject.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedSubjectIds.includes(subject.id)
                        ? 'bg-primary text-white'
                        : 'bg-surface text-muted hover:bg-primary/10'
                    }`}
                  >
                    {subject.name}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
