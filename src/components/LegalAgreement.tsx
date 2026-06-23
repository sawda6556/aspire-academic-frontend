'use client';

import React from 'react';

interface LegalAgreementProps {
  title: string;
  content: string;
  onAccept: (accepted: boolean) => void;
  checked: boolean;
}

export default function LegalAgreement({ title, content, onAccept, checked }: LegalAgreementProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-deep-ocean-blue">{title}</h3>
      <div className="h-48 overflow-y-auto border border-gray-200 rounded-md p-4 bg-gray-50 text-sm text-gray-700">
        <div className="prose prose-sm max-w-none">
          {content.split('
').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <input
          id={`accept-${title.toLowerCase().replace(/\s+/g, '-')}`}
          type="checkbox"
          checked={checked}
          onChange={(e) => onAccept(e.target.checked)}
          className="h-5 w-5 mt-0.5 text-deep-ocean-blue border-gray-300 rounded focus:ring-deep-ocean-blue"
        />
        <label htmlFor={`accept-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-600">
          I have read and agree to the {title}.
        </label>
      </div>
    </div>
  );
}
