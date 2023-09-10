import { Offer } from "./Offer";
import { OfferPackage } from "./OfferPackage";

export interface Order {
    id?: number;
    userId: number;
    offer: Offer;
    offerPackage: OfferPackage;
    date: Date;
    startHour: string;
    endHour?: string;
    picturePath?: string;
}