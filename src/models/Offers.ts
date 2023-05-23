export type OfferStatus = 'completed' | 'pending' | 'failed';

export interface Offers {
  id: string;
  status: OfferStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
