'use client';

import React from 'react';
import Image from 'next/image';

interface Resource {
  id: string;
  title: string;
  description: string;
  price: number;
  file_url: string;
  status: string;
  created_at: string;
  tutor: {
    full_name: string;
    gender: string;
  };
  category: {
    name: string;
  };
}

interface ResourceReviewPanelProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onFeature: (id: string) => Promise<void>;
}

export default function ResourceReviewPanel({
  resource,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onFeature,
}: ResourceReviewPanelProps) {
  if (!resource) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Review Resource</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Resource Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Title</h3>
              <p className="text-lg font-bold text-gray-900 mt-1">{resource.title}</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Tutor</h3>
                <div className="flex items-center mt-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 overflow-hidden">
                    {/* Assigned Gender Avatar placeholder */}
                    <span className="text-xs font-bold text-blue-600">
                      {resource.tutor.gender === 'FEMALE' ? 'F' : 'M'}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900">{resource.tutor.full_name}</p>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Category</h3>
                <p className="mt-2 inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  {resource.category.name}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Price</h3>
                <p className="text-lg font-bold text-gray-900 mt-1">${Number(resource.price).toFixed(2)}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Uploaded</h3>
                <p className="text-gray-900 mt-1">{new Date(resource.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Description</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{resource.description}</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Preview Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Preview</h3>
            <div className="aspect-[4/3] bg-gray-100 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center p-6">
              <div className="text-4xl mb-3">📄</div>
              <p className="text-sm font-medium text-gray-900">Resource File</p>
              <p className="text-xs text-gray-500 mt-1 mb-4 truncate w-full max-w-[200px]">{resource.file_url}</p>
              <a 
                href={resource.file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Download to Review
              </a>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Moderation Notes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Moderation Notes</h3>
            <textarea 
              className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              placeholder="Internal notes for this resource..."
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => onReject(resource.id)}
              className="flex-1 px-4 py-3 border border-coral text-coral font-bold rounded-xl hover:bg-coral/5 transition-colors"
            >
              Reject
            </button>
            <button 
              onClick={() => onApprove(resource.id)}
              className="flex-[2] px-4 py-3 bg-[#4BA3A3] text-white font-bold rounded-xl hover:bg-[#4BA3A3]/90 transition-colors shadow-md"
            >
              Approve & Publish
            </button>
          </div>
          
          <button 
            onClick={() => onFeature(resource.id)}
            className="w-full px-4 py-3 bg-[#C9A962] text-white font-bold rounded-xl hover:bg-[#C9A962]/90 transition-colors shadow-sm"
          >
            Feature on Home Page
          </button>
        </div>
      </div>
    </>
  );
}
