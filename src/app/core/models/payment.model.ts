export class  Payment {
  creditCard: CardData;
  flightId: number;
  passenger: Passenger;
}

export class Passenger
  {
    citizenship: string;
    countryCode: string;
    dateOfBirth: Date;
    email: string;
    firstName: string;
    issuingCountry: string;
    lastName: string;
    passportExpirationDate: Date;
    passportNumber: string;
    phone: string;
    title: string;
  }

export class CardData {
  cardCvv: string;
  cardExpirationDate: Date;
  cardHolderName: string;
  cardNumber: string;
}

export interface PersonalData {
  dateOfBirth: Date;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  title: string;
}

export interface PassportData {
  citizenship: string;
  countryCode: string;
  issuingCountry: string;
  passportExpirationDate: Date;
  passportNumber: string;
}
