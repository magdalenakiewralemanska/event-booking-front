import {Address} from "./Address";

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
}
