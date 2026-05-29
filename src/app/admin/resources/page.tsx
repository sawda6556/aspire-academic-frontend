import React from 'react';

export default function ResourceModerationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Resource Moderation</h1>
      <div className="mt-10 p-12 bg-white rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
        <div className="text-4xl mb-4">📚</div>
        <h2 className="text-lg font-semibold text-gray-900">Store Integration Pending</h2>
        <p className="text-gray-500 max-w-sm mt-2">
          The Resource Store is currently being implemented. This moderation dashboard will be available once the store module is live.
        </p>
      </div>
    </div>
  );
}
