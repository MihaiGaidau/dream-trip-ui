export interface Airport {
  content: AirportData [];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}

export interface AirportData {
  id?: any;
  name: string;
  city: string;
  code: string;
}
