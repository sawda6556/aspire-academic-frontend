import React, { useEffect, useRef } from 'react';
import { Message } from './types';

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  otherUser: {
    id: string;
    full_name: string;
    avatar_url: string;
    online?: boolean;
  };
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUserId,
  otherUser,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#FAFBFC]">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={otherUser.avatar_url || '/assets/avatars/male-avatar.svg'}
            alt={otherUser.full_name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="text-sm font-semibold text-gray-800">{otherUser.full_name}</h3>
            <div className="flex items-center mt-0.5">
              <div className={`w-2 h-2 rounded-full ${otherUser.online ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-xs text-gray-500 ml-1.5">{otherUser.online ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isOutgoing = msg.sender_id === currentUserId;
          const showAvatar = !isOutgoing && (index === 0 || messages[index - 1].sender_id !== msg.sender_id);

          return (
            <div key={msg.id} className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
              {!isOutgoing && (
                <div className="w-8 mr-2">
                  {showAvatar && (
                    <img
                      src={otherUser.avatar_url || '/assets/avatars/male-avatar.svg'}
                      alt={otherUser.full_name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                  isOutgoing
                    ? 'bg-[#2B4C7E] text-white rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.content}
                <div className={`text-[10px] mt-1.5 ${isOutgoing ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
