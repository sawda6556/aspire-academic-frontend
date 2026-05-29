'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AdminStudentReview() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/student-profiles`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.filter((s: any) => s.verification_status === 'PENDING' && !s.parent_id));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch students:', err);
        setIsLoading(false);
      });
  }, []);

  const handleReview = async (studentId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/student-profiles/admin/review/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setStudents(students.filter((s) => s.id !== studentId));
      }
    } catch (err) {
      console.error('Failed to review student:', err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold text-heading mb-8">Admin: Independent Student Verification</h1>
        
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : students.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm ring-1 ring-surface text-muted">
            No pending independent student applications.
          </div>
        ) : (
          <div className="space-y-6">
            {students.map((student) => (
              <div key={student.id} className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-grow space-y-4">
                    <h2 className="text-xl font-bold text-heading">{student.full_name}</h2>
                    <p className="text-sm text-muted italic">Independent Student (18+)</p>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-bold text-heading uppercase mb-2">ID Document</h3>
                      {student.id_document_url ? (
                        <a 
                          href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${student.id_document_url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block p-4 border rounded-lg hover:bg-surface transition-colors text-primary text-sm font-medium"
                        >
                          View ID Document
                        </a>
                      ) : (
                        <span className="text-red-500 text-xs italic">Missing ID document</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-w-[150px]">
                    <button
                      onClick={() => handleReview(student.id, 'APPROVED')}
                      className="w-full rounded-lg bg-teal text-white py-3 text-sm font-bold hover:bg-teal/90 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(student.id, 'REJECTED')}
                      className="w-full rounded-lg border-2 border-coral text-coral py-3 text-sm font-bold hover:bg-coral/5 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
