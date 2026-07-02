import React from 'react';

interface BookingSummaryProps {
  tutorName: string;
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  price: number;
  isTrial: boolean;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  tutorName,
  subject,
  date,
  startTime,
  endTime,
  price,
  isTrial,
  onConfirm,
  isLoading,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <div className="p-2 bg-blue-50 rounded-lg mr-3 text-[#2B4C7E]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Date</p>
            <p className="text-sm text-gray-700 font-semibold">{date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-2 bg-blue-50 rounded-lg mr-3 text-[#2B4C7E]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Time</p>
            <p className="text-sm text-gray-700 font-semibold">{startTime} - {endTime} (GMT)</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-2 bg-blue-50 rounded-lg mr-3 text-[#2B4C7E]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Subject & Tutor</p>
            <p className="text-sm text-gray-700 font-semibold">{subject} with {tutorName}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Lesson Price</span>
          <span className="text-sm font-semibold text-gray-700">${price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <span className="font-bold text-gray-800">Total</span>
          <span className="font-bold text-[#2B4C7E]">${isTrial ? '0.00' : price.toFixed(2)}</span>
        </div>
        {isTrial && (
          <p className="text-[10px] text-[#C9A962] font-medium mt-1 italic">
            * 10-minute free trial applied
          </p>
        )}
      </div>

      <div className="text-[11px] text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100 text-center leading-normal">
        By continuing, you agree to our{' '}
        <a href="/refund" target="_blank" className="text-[#2B4C7E] hover:underline font-semibold">
          Refund & Cancellation Policy
        </a>
        . No cash refunds are issued.
      </div>

      <button
        onClick={onConfirm}
        disabled={isLoading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-all
          ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2B4C7E] hover:bg-blue-800 shadow-lg shadow-blue-900/20'}
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          isTrial ? 'Confirm Trial Booking' : 'Confirm & Book Lesson'
        )}
      </button>
    </div>
  );
};
