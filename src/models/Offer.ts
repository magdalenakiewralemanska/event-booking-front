import {Address} from "./Address";
import { DaySchedule } from "./DaySchedule";

export interface Offer {
  id?: number;
  name: string;
  minAge: number;
  maxAge: number;
  description: string;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  address: Address;
  eventId: number;
  picturePath: string;
  weekSchedule?: DaySchedule[];
}
