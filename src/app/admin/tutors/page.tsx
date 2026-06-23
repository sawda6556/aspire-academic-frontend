'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminTutorReview() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutors = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/tutor-profiles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTutors(response.data.filter((t: any) => t.verification_status === 'PENDING'));
    } catch (err) {
      console.error('Failed to fetch tutors:', err);
      setError('Failed to load tutor applications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleReview = async (tutorId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/tutor-profiles/admin/review/${tutorId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTutors(); // Refresh list
    } catch (err) {
      console.error('Failed to review tutor:', err);
      alert('Failed to update tutor status');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Tutor Applications</h1>
      <p className="text-gray-500 mt-1">Review and approve new tutor registrations</p>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center py-12">\n            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>\n          </div>
        ) : tutors.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 p-12 text-center">\n            <p className="text-gray-500">No pending tutor applications found</p>\n          </div>
        ) : (
          <div className="space-y-6">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">\n                <div className="flex flex-col md:flex-row justify-between gap-6">\n                  <div className="flex-1">\n                    <div className="flex items-center gap-4">\n                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-400">\n                        {tutor.user?.full_name?.substring(0, 2).toUpperCase() || 'TP'}\n                      </div>\n                      <div>\n                        <h2 className="text-lg font-bold text-gray-900">{tutor.user?.full_name || 'N/A'}</h2>\n                        <p className="text-sm text-gray-500">{tutor.subjects_taught?.join(', ') || 'No subjects listed'}</p>\n                      </div>\n                    </div>\n                    \n                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">\n                      <div>\n                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Experience</p>\n                        <p className="text-sm text-gray-700 mt-1">{tutor.experience_background || 'N/A'}</p>\n                      </div>\n                      <div>\n                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Qualifications</p>\n                        <p className="text-sm text-gray-700 mt-1">{tutor.qualifications_certificates || 'N/A'}</p>\n                      </div>\n                    </div>\n\n                    <div className="mt-6 flex flex-wrap gap-4">\n                      {tutor.id_document_url && (\n                        <a \n                          href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${tutor.id_document_url}`}\n                          target="_blank"\n                          rel="noopener noreferrer"\n                          className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"\n                        >\n                          View ID Document\n                        </a>\n                      )}\n                      {tutor.cert_document_url && (\n                        <a \n                          href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${tutor.cert_document_url}`}\n                          target="_blank"\n                          rel="noopener noreferrer"\n                          className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"\n                        >\n                          View Certificates\n                        </a>\n                      )}\n                    </div>\n                  </div>\n\n                  <div className="flex flex-col gap-3 min-w-[140px]">\n                    <button \n                      onClick={() => handleReview(tutor.id, 'APPROVED')}\n                      className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors"\n                    >\n                      Approve\n                    </button>\n                    <button \n                      onClick={() => handleReview(tutor.id, 'REJECTED')}\n                      className="px-4 py-2 border border-red-200 text-red-600 text-sm font-bold rounded-lg hover:bg-red-50 transition-colors"\n                    >\n                      Reject\n                    </button>\n                  </div>\n                </div>\n              </div>\n            ))}\n          </div>
        )}\n      </div>
    </div>
  );\n}\n