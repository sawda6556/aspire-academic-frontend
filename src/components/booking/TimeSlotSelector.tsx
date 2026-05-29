import React from 'react';
import { TimeSlot } from './types';

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSlotSelect: (id: string) => void;
  price: number;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  selectedSlotId,
  onSlotSelect,
  price,
}) => {
  if (slots.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-xl text-center text-gray-500 border border-dashed border-gray-300">
        <p>No available slots on this day.</p>
        <p className="text-sm mt-1">Try selecting a different date.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {slots.map((slot) => {
        const isSelected = selectedSlotId === slot.id;
        return (
          <button
            key={slot.id}
            onClick={() => onSlotSelect(slot.id)}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all
              ${isSelected 
                ? 'bg-[#2B4C7E] border-[#2B4C7E] text-white shadow-md' 
                : 'bg-white border-gray-200 text-gray-700 hover:border-[#5B8FB9]'
              }
            `}
          >
            <div>
              <span className="text-sm font-medium">
                {slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}
              </span>
            </div>
            <div className="flex items-center">
              <span className={`text-xs font-semibold mr-3 ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                ${price.toFixed(2)}
              </span>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                ${isSelected ? 'bg-white border-white' : 'border-gray-300'}
              `}>
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-[#2B4C7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
