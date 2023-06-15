
export interface OfferPackage {
    id?: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    maxAmountOfPeople: number;
    isOwnFoodAvailable: boolean;
    isOwnDrinkAvailable: boolean;
    specials: string;
    otherDetails: string,
    offerId: number;
}