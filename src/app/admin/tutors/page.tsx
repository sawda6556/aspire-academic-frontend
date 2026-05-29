'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AdminTutorReview() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be restricted to admin users only
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/tutor-profiles`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data.filter((t: any) => t.verification_status === 'PENDING'));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch tutors:', err);
        setIsLoading(false);
      });
  }, []);

  const handleReview = async (tutorId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/tutor-profiles/admin/review/${tutorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setTutors(tutors.filter((t) => t.id !== tutorId));
      }
    } catch (err) {
      console.error('Failed to review tutor:', err);
    }
  };

  const handleDbsStatusChange = async (tutorId: string, status: 'VERIFIED' | 'REJECTED') => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/tutor-profiles/admin/review-dbs/${tutorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedTutor = await response.json();
        setTutors(tutors.map((t) => t.id === tutorId ? { ...t, dbs_verified_status: updatedTutor.dbs_verified_status } : t));
      }
    } catch (err) {
      console.error('Failed to review DBS:', err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold text-heading mb-8">Admin: Tutor Verification Review</h1>
        
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm ring-1 ring-surface text-muted">
            No pending tutor applications.
          </div>
        ) : (
          <div className="space-y-6">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-grow space-y-4">
                    <h2 className="text-xl font-bold text-heading">{tutor.full_name}</h2>
                    <p className="text-sm text-muted">Country: {tutor.country}</p>
                    <p className="text-sm text-muted">Bio: {tutor.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-heading uppercase">ID Document</h3>
                        {tutor.id_document_url ? (
                          <a 
                            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${tutor.id_document_url}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-4 border rounded-lg hover:bg-surface transition-colors text-primary text-sm font-medium"
                          >
                            View ID Document
                          </a>
                        ) : (
                          <span className="text-red-500 text-xs italic">Missing ID document</span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-heading uppercase">Proof of Address</h3>
                        {tutor.address_proof_url ? (
                          <a 
                            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${tutor.address_proof_url}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-4 border rounded-lg hover:bg-surface transition-colors text-primary text-sm font-medium"
                          >
                            View Address Proof
                          </a>
                        ) : (
                          <span className="text-red-500 text-xs italic">Missing address proof</span>
                        )}
                      </div>

                      {tutor.country === 'United Kingdom' && (
                        <div className="col-span-1 md:col-span-2 space-y-4 pt-4 border-t">
                          <h3 className="text-sm font-bold text-heading uppercase">Enhanced DBS Verification</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-muted">DBS Certificate</p>
                                {tutor.dbs_certificate_url ? (
                                    <a 
                                        href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${tutor.dbs_certificate_url}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block p-4 border rounded-lg hover:bg-surface transition-colors text-primary text-sm font-medium"
                                    >
                                        View DBS Certificate
                                    </a>
                                ) : (
                                    <span className="text-red-500 text-xs italic">Missing DBS Certificate</span>
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted">Update Service Info</p>
                                <div className="p-3 border rounded-lg bg-background text-xs space-y-1">
                                    <p><span className="font-semibold">Registered:</span> {tutor.is_on_update_service ? 'Yes' : 'No'}</p>
                                    <p><span className="font-semibold">Number:</span> {tutor.dbs_certificate_number || 'N/A'}</p>
                                    <p><span className="font-semibold">Status:</span> <span className={`font-bold ${tutor.dbs_verified_status === 'VERIFIED' ? 'text-teal' : 'text-coral'}`}>{tutor.dbs_verified_status}</span></p>
                                </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                              <button 
                                onClick={() => handleDbsStatusChange(tutor.id, 'VERIFIED')}
                                className="bg-teal text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-teal/90"
                              >
                                Mark DBS Verified
                              </button>
                              <button 
                                onClick={() => handleDbsStatusChange(tutor.id, 'REJECTED')}
                                className="bg-coral text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-coral/90"
                              >
                                Reject DBS
                              </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-w-[150px]">
                    <button
                      onClick={() => handleReview(tutor.id, 'APPROVED')}
                      className="w-full rounded-lg bg-teal text-white py-3 text-sm font-bold hover:bg-teal/90 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(tutor.id, 'REJECTED')}
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
