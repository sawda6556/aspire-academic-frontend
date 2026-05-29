'use client';

import React, { useState } from 'react';

interface DocumentUploadFieldProps {
  label: string;
  description?: string;
  onUploadSuccess: (url: string) => void;
  required?: boolean;
}

export default function DocumentUploadField({ label, description, onUploadSuccess, required }: DocumentUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/uploads/document`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadSuccess(data.url);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-muted">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-muted mb-2">{description}</p>}
      <div className="flex items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <div className={`border-2 border-dashed rounded-lg p-3 text-center text-sm ${isUploading ? 'bg-surface animate-pulse' : 'border-surface hover:border-primary/50'}`}>
            {isUploading ? 'Uploading...' : fileName || 'Click to select or drag and drop'}
          </div>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
