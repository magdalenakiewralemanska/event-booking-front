
export interface OfferPackage {
    id?: number;
    title: string;
    description: string;
    price: string;
    duration: number;
    maxAmountOfPeople: number;
    isOwnFoodAvailable: boolean;
    isOwnDrinkAvailable: boolean;
    specials: string;
    otherDetails: string,
    offerId: number;
    picturePath: string;
}