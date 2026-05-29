import React from 'react';

interface BookingConfirmationProps {
  meetingUrl: string;
  onClose: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  meetingUrl,
  onClose,
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center shadow-xl max-w-md mx-auto">
      <div className="w-16 h-16 bg-teal-50 text-[#4BA3A3] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
      <p className="text-gray-500 mb-8">
        Your lesson has been successfully scheduled. A confirmation email with details has been sent to you.
      </p>

      <div className="bg-blue-50 p-4 rounded-xl mb-8 text-left">
        <p className="text-xs font-bold text-[#2B4C7E] uppercase mb-1">Zoom Meeting Link</p>
        <a 
          href={meetingUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 font-medium break-all hover:underline"
        >
          {meetingUrl}
        </a>
        <p className="text-[10px] text-gray-400 mt-2 italic">
          * This link will also be available in your dashboard and messages.
        </p>
      </div>

      <div className="space-y-3">
        <button 
          onClick={onClose}
          className="w-full py-3 bg-[#2B4C7E] text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
        >
          View My Bookings
        </button>
        <button 
          onClick={onClose}
          className="w-full py-3 bg-white text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back to Marketplace
        </button>
      </div>
    </div>
  );
};
