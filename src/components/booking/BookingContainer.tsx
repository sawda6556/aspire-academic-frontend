import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import TimeSlotSelector from './TimeSlotSelector';
import BookingSummary from './BookingSummary';
import BookingConfirmation from './BookingConfirmation';
import { TimeSlot } from './types';

interface BookingContainerProps {
  tutorId: string;
  tutorName: string;
  subject: string;
  hourlyRate: number;
}

const BookingContainer: React.FC<BookingContainerProps> = ({
  tutorId,
  tutorName,
  subject,
  hourlyRate
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isTrial, setIsTrial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{ meetingUrl: string } | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // In production, fetch available slots for the selected date
    // For now, using mock slots
    setAvailableSlots([
      { id: '1', start_time: '09:00', end_time: '10:00' },
      { id: '2', start_time: '10:00', end_time: '11:00' },
      { id: '3', start_time: '14:00', end_time: '15:00' },
      { id: '4', start_time: '15:00', end_time: '16:00' },
    ]);
  }, [selectedDate]);

  const handleConfirmBooking = async () => {
    if (!selectedSlotId) return;
    setIsLoading(true);

    const slot = availableSlots.find(s => s.id === selectedSlotId);
    if (!slot) return;

    // Construct start and end times
    const start = new Date(selectedDate);
    const [h, m] = slot.start_time.split(':');
    start.setHours(parseInt(h), parseInt(m), 0);

    const end = new Date(selectedDate);
    const [eh, em] = slot.end_time.split(':');
    end.setHours(parseInt(eh), parseInt(em), 0);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: json.stringify({
          tutor_id: tutorId,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          is_trial: isTrial
        })
      });

      if (!response.ok) throw new Error('Booking failed');
      
      const data = await response.json();
      
      setConfirmationData({
        meetingUrl: data.video_meeting_url || `https://zoom.us/j/${data.id}`
      });
      setIsConfirmed(true);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to create booking. Please make sure you are logged in.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfirmed && confirmationData) {
    return (
      <div className=\"py-12\">
        <BookingConfirmation
          meetingUrl={confirmationData.meetingUrl}
          onClose={() => setIsConfirmed(false)}
        />
      </div>
    );
  }

  const selectedSlot = availableSlots.find(s => s.id === selectedSlotId);

  return (
    <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8\">
      <div className=\"lg:col-span-2 space-y-8\">
        <section>
          <h2 className=\"text-xl font-bold text-gray-800 mb-4 flex items-center\">
            <span className=\"w-8 h-8 bg-[#2B4C7E] text-white rounded-full flex items-center justify-center text-sm mr-3\">1</span>
            Select a Date
          </h2>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </section>

        <section>
          <h2 className=\"text-xl font-bold text-gray-800 mb-4 flex items-center\">
            <span className=\"w-8 h-8 bg-[#2B4C7E] text-white rounded-full flex items-center justify-center text-sm mr-3\">2</span>
            Available Time Slots
          </h2>
          <TimeSlotSelector
            slots={availableSlots}
            selectedSlotId={selectedSlotId}
            onSlotSelect={setSelectedSlotId}
            price={hourlyRate}
          />
        </section>

        <section className=\"bg-gold-50 p-6 rounded-xl border border-[#C9A962]/30 bg-[#C9A962]/5\">
          <div className=\"flex items-start\">
            <div className=\"pt-1\">
              <input
                id=\"trial-booking\"
                type=\"checkbox\"
                checked={isTrial}
                onChange={(e) => setIsTrial(e.target.checked)}
                className=\"w-5 h-5 text-[#C9A962] border-gray-300 rounded focus:ring-[#C9A962]\"
              />
            </div>
            <div className=\"ml-4\">
              <label htmlFor=\"trial-booking\" className=\"text-sm font-bold text-gray-800 cursor-pointer\">
                Book a 10-minute free trial
              </label>
              <p className=\"text-xs text-gray-500 mt-1\">
                First time with this tutor? You can book a free 10-minute trial session to discuss your needs.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className=\"lg:col-span-1\">
        <div className=\"sticky top-8\">
          <h2 className=\"text-xl font-bold text-gray-800 mb-4 flex items-center\">
            <span className=\"w-8 h-8 bg-[#2B4C7E] text-white rounded-full flex items-center justify-center text-sm mr-3\">3</span>
            Review & Confirm
          </h2>
          
          {selectedSlot ? (
            <BookingSummary
              tutorName={tutorName}
              subject={subject}
              date={selectedDate}
              startTime={selectedSlot.start_time.substring(0, 5)}
              endTime={selectedSlot.end_time.substring(0, 5)}
              price={hourlyRate}
              isTrial={isTrial}
              onConfirm={handleConfirmBooking}
              isLoading={isLoading}
            />
          ) : (
            <div className=\"bg-gray-50 p-8 rounded-xl text-center text-gray-400 border border-dashed border-gray-200\">
              <svg className=\"w-12 h-12 mx-auto mb-3 opacity-20\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" d=\"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z\" />
              </svg>
              <p className=\"text-sm\">Please select a time slot to see the summary</p>
            </div>
          )}

          <div className=\"mt-6 p-4 bg-gray-50 rounded-lg\">
            <div className=\"flex items-center text-xs text-gray-500\">
              <svg className=\"w-4 h-4 mr-2 text-green-500\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" d=\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0L21 12a11.955 11.955 0 01-11.955 11.955 11.955 11.955 0 01-11.955-11.955l.382-8.96m17.236 0A11.955 11.955 0 0112 2.944z\" />
              </svg>
              Secure & Privacy-Focused Booking
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingContainer;
