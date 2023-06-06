import { EventType } from "react-hook-form";
import { Address } from "./Address";
import { OfferPackage } from "./OfferPackage";

export type OfferStatus = 'completed' | 'pending' | 'failed';

export interface Offer {
  id: number;
  name: string;
  minAge: number;
  maxAge: number;
  description: string;
  organizer: string;
  contact: string;
  address: Address;
  event: EventType;
  offerPackages: OfferPackage;
}
