export interface Ticket {
  arrivalAirport: string;
  arrivalDate: Date;
  departureAirport: string;
  departureDate: Date;
  flightNumber: string;
  ticketIdentifier: string;
}
export interface BoughtTicket{
  id: number;
  createDate: Date;
  updateDate: Date;
  identifier: string;
  passengerTitle: string;
  passengerFirstName: string;
  passengerLastName: string;
  departureDate: Date;
  arrivalDate: Date;
  flightNumber: string;
  arrivalAirport: {
    id: number;
    code: string;
    name: string;
    city: string;
  };
  departureAirport: {
    id: number;
    code: string;
    name: string;
    city: string;
  };
}
