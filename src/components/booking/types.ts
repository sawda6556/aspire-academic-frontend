export interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  day_of_week: number;
}

export interface Booking {
  id: string;
  tutor_id: string;
  student_id: string;
  start_time: string;
  end_time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  is_trial: boolean;
  video_meeting_url?: string;
}

export interface TutorAvailability {
  id: string;
  day_of_week: number;
  slots: TimeSlot[];
}
