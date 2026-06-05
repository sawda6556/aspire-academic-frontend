'use client';

import React, { useState, useEffect } from 'react';
import { useSocket } from './useSocket';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import { MessageInput } from './MessageInput';
import { Message, Conversation } from './types';

interface MessagingContainerProps {
  currentUserId: string;
  token: string;
  initialConversations?: Conversation[];
  initialActiveConversationId?: string;
}

export const MessagingContainer: React.FC<MessagingContainerProps> = ({
  currentUserId,
  token,
  initialConversations = [],
  initialActiveConversationId,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    initialActiveConversationId || (initialConversations.length > 0 ? initialConversations[0].otherUser.id : null)
  );
  const [messages, setMessages] = useState<Message[]>([]);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const { socket, isConnected } = useSocket(apiUrl, token);

  useEffect(() => {
    if (!initialConversations || initialConversations.length === 0) {
      fetch(`${apiUrl}/messages/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setConversations(data);
          if (data.length > 0 && !activeConversationId) {
            setActiveConversationId(data[0].otherUser.id);
          }
        })
        .catch(console.error);
    }
  }, [apiUrl, token, initialConversations]);

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (message: Message) => {
      // Update messages if it's the active conversation
      if (message.sender_id === activeConversationId || message.receiver_id === activeConversationId) {
        setMessages((prev) => [...prev, message]);
      }

      // Update conversation list
      setConversations((prev) => {
        const otherId = message.sender_id === currentUserId ? message.receiver_id : message.sender_id;
        const index = prev.findIndex((c) => c.otherUser.id === otherId);
        
        if (index === -1) {
          // New conversation (this would need more user info from somewhere)
          return prev; 
        }

        const updatedConv = {
          ...prev[index],
          lastMessage: message,
          unreadCount: (message.sender_id !== currentUserId && activeConversationId !== otherId) 
            ? prev[index].unreadCount + 1 
            : prev[index].unreadCount,
        };

        const newConversations = [...prev];
        newConversations.splice(index, 1);
        return [updatedConv, ...newConversations];
      });
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket, activeConversationId, currentUserId]);

  useEffect(() => {
    if (activeConversationId) {
      // Fetch history for active conversation
      fetch(`${apiUrl}/messages/history/${activeConversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch(console.error);
    }
  }, [activeConversationId, token]);

  const handleSendMessage = (content: string) => {
    if (!socket || !activeConversationId) return;

    socket.emit('sendMessage', {
      receiverId: activeConversationId,
      content,
    }, (sentMessage: Message) => {
      // Callback from server with the saved message
      setMessages((prev) => [...prev, sentMessage]);
    });
  };

  const activeConv = conversations.find((c) => c.otherUser.id === activeConversationId);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="w-1/3">
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
        />
      </div>
      <div className="w-2/3 flex flex-col">
        {activeConv ? (
          <>
            <div className="flex-1 overflow-hidden">
              <ChatWindow
                messages={messages}
                currentUserId={currentUserId}
                otherUser={activeConv.otherUser}
              />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex flex-center items-center justify-center bg-gray-50 text-gray-400">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
