export interface Flight {
  content: FlightData[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;

}

export interface FlightData {
  id?: any;
  departureDate: Date;
  number: string;
  ticketPrice: number;
  arrivalDate: Date;
  availableTickets: number;
  createDate: Date;
  arrivalAirport: {
    city: string;
    code: string;
    name: string;
  };
  departureAirport: {
    city: string;
    code: string;
    name: string;
  };
}

