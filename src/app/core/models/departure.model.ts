export interface Departure {
  fromDate: Date;
  fromDestination: string;
  oneWay: boolean;
  passengers: number;
  toDate: Date;
  toDestination: string;
}
