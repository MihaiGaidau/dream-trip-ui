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
    id?: any;
    city: string;
    code: string;
    name: string;
  };
  departureAirport: {
    id?: any;
    city: string;
    code: string;
    name: string;
  };
}

