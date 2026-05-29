import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (content: string, attachment?: File) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSendMessage(content);
      setContent('');
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <button
          type="button"
          className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors"
          aria-label="Attach file"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        <div className="flex-1 relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type a message..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none min-h-[44px] max-h-32"
            rows={1}
          />
        </div>
        <button
          type="submit"
          disabled={!content.trim()}
          className={`p-2.5 rounded-full transition-all ${
            content.trim()
              ? 'bg-[#2B4C7E] text-white hover:bg-blue-800'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};
