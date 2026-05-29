import React from 'react';
import { Conversation } from './types';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
}) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        <div className="mt-2 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <div className="absolute left-3 top-2.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.otherUser.id}
            onClick={() => onSelectConversation(conv.otherUser.id)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              activeConversationId === conv.otherUser.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
            }`}
          >
            <div className="relative">
              <img
                src={conv.otherUser.avatar_url || '/assets/avatars/male-avatar.svg'}
                alt={conv.otherUser.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conv.otherUser.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-baseline">
                <h3 className={`text-sm font-semibold truncate ${conv.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                  {conv.otherUser.full_name}
                </h3>
                <span className="text-xs text-gray-500">
                  {new Date(conv.lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className={`text-xs truncate mt-1 ${conv.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                {conv.lastMessage.content}
              </p>
            </div>
            {conv.unreadCount > 0 && (
              <div className="ml-2 w-2 h-2 bg-coral-500 rounded-full bg-[#E8A598]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
