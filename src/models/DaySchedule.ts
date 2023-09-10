import { TimePeriod } from "./TimePeriod";

export interface DaySchedule {
  id?: number;
    date: string | Date;
    dayOfWeek?: string;
    workingHours: TimePeriod[]
    disabled?: boolean;
    offerId?: number;
  }