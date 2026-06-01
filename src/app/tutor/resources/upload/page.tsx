'use client';

import React, { useState, useEffect } from 'react';
import TutorDashboardLayout from '@/components/dashboard/TutorDashboardLayout';
import { useRouter } from 'next/navigation';

export default function ResourceUploadPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    grade_level: '',
    subjects: '',
    file_url: '',
    preview_url: '',
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(`${apiUrl}/resources/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, [apiUrl]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'file_url' | 'preview_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch(`${apiUrl}/resources/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, [field]: data.url }));
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      subjects: formData.subjects.split(',').map(s => s.trim()).filter(s => s),
    };

    try {
      const res = await fetch(`${apiUrl}/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/tutor/resources');
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to create resource');
      }
    } catch (err) {
      console.error('Submit error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TutorDashboardLayout>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <button 
            onClick={() => router.back()}
            className="text-muted hover:text-primary mb-4 flex items-center gap-1 font-medium transition-colors"
          >
            <span>←</span> Back to Resources
          </button>
          <h1 className="text-3xl font-bold text-heading">Upload Resource</h1>
          <p className="text-muted">Share your knowledge with the community.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-surface shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-heading">Resource Title</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-surface focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="e.g. Complete GCSE Algebra Guide"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-heading">Description</label>
            <textarea 
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-surface focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              placeholder="Describe what's included in this resource..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-heading">Price ($)</label>
              <input 
                type="number" 
                step="0.01"
                required
                className="w-full px-4 py-3 rounded-xl border border-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="0.00 for free"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-heading">Category</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                value={formData.category_id}
                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-heading">Grade Level</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="e.g. Grade 10, A-Level"
                value={formData.grade_level}
                onChange={e => setFormData({ ...formData, grade_level: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-heading">Subjects (comma separated)</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Math, Algebra, GCSE"
                value={formData.subjects}
                onChange={e => setFormData({ ...formData, subjects: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-surface">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-heading">Resource File (PDF, ZIP, etc.)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  className="hidden" 
                  id="resource-file"
                  onChange={e => handleFileUpload(e, 'file_url')}
                />
                <label 
                  htmlFor="resource-file"
                  className="px-6 py-3 bg-surface rounded-xl font-bold cursor-pointer hover:bg-surface/80 transition-colors"
                >
                  {formData.file_url ? 'Change File' : 'Choose File'}
                </label>
                {formData.file_url && <span className="text-xs text-teal font-bold">✓ Uploaded</span>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-heading">Preview Image (Optional)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  className="hidden" 
                  id="preview-file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, 'preview_url')}
                />
                <label 
                  htmlFor="preview-file"
                  className="px-6 py-3 bg-surface rounded-xl font-bold cursor-pointer hover:bg-surface/80 transition-colors"
                >
                  {formData.preview_url ? 'Change Preview' : 'Choose Preview'}
                </label>
                {formData.preview_url && <span className="text-xs text-teal font-bold">✓ Uploaded</span>}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={loading || uploading || !formData.file_url}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Publish Resource'}
            </button>
            <p className="text-center text-[10px] text-muted mt-4">
              By publishing, you agree to our Terms of Service and the 15% platform commission.
            </p>
          </div>
        </form>
      </div>
    </TutorDashboardLayout>
  );
}
