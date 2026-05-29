import React, { useState } from 'react';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  availability?: number[]; // days of week with availability [0, 1, 2...]
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  availability = [1, 2, 3, 4, 5],
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (month: Date) => {
    return new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  };

  const startOfMonth = (month: Date) => {
    return new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const startDay = startOfMonth(currentMonth);
    const days = [];

    // Padding for start of month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-12 w-12"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();
      const hasAvailability = availability.includes(date.getDay());
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

      days.push(
        <button
          key={i}
          disabled={isPast}
          onClick={() => onDateSelect(date)}
          className={`h-12 w-12 flex flex-col items-center justify-center rounded-lg transition-colors relative
            ${isSelected ? 'bg-[#2B4C7E] text-white' : 'hover:bg-gray-100'}
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}
            ${isToday && !isSelected ? 'border border-[#C9A962]' : ''}
          `}
        >
          <span>{i}</span>
          {hasAvailability && !isPast && (
            <div className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-[#5B8FB9]'}`}></div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex space-x-2">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="h-8 w-12 flex items-center justify-center text-xs font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};
