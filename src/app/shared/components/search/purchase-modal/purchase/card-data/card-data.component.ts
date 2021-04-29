import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CardData, Passenger, PassportData, Payment, PersonalData} from '../../../../../../core/models/payment.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PurchaseService} from '../../../../../../core/services/purchase.service';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss']
})
export class CardDataComponent implements OnInit {
  public cardDataForm: FormGroup;
  public cardData: CardData;
  public payment: Payment = new Payment();

  @Output() cardDataEvent: EventEmitter<CardData> = new EventEmitter<CardData>();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private purchaseService: PurchaseService
  ) {
    this.payment.creditCard = new CardData();
    this.payment.passenger = new Passenger();
  }

  ngOnInit(): void {
    const value = sessionStorage.getItem('card-form-value');
    if (value) {
      const cardData = JSON.parse(value) as CardData;
      this.cardDataForm = this.formBuilder.group({
        cardCvv: [null, Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3)])],
        cardExpirationDate: [cardData.cardExpirationDate, Validators.compose([Validators.required])],
        cardHolderName: [cardData.cardHolderName, Validators.compose([Validators.required])],
        cardNumber: [cardData.cardNumber, Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16)])],
      });
    } else {
      this.initCardForm();
    }
  }

  onSubmit() {
    this.cardData = this.cardDataForm.value;
    this.cardDataEvent.emit(this.cardData);
  }

  private initCardForm(): void {
    this.cardDataForm = this.formBuilder.group({
      cardCvv: [null, Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3)])],
      cardExpirationDate: [null, Validators.compose([Validators.required])],
      cardHolderName: [null, Validators.compose([Validators.required])],
      cardNumber: [null, Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16)])],
    });
  }

  finish() {
    console.log(this.cardDataForm.value as CardData);
    const personalData = JSON.parse(sessionStorage.getItem('personal-form-value')) as PersonalData;
    const passportData = JSON.parse(sessionStorage.getItem('passport-form-value')) as PassportData;
    const cardData = this.cardDataForm.value as CardData;
    console.log('here');
    console.log(this.payment);
    this.payment.creditCard.cardCvv = cardData?.cardCvv;
    console.log('here');
    this.payment.creditCard.cardExpirationDate = cardData.cardExpirationDate;
    this.payment.creditCard.cardHolderName = cardData.cardHolderName;
    this.payment.creditCard.cardNumber = cardData.cardNumber;

    this.payment.flightId = JSON.parse(sessionStorage.getItem('ticketId')) as number;
    this.payment.passenger.citizenship = passportData.citizenship;
    this.payment.passenger.countryCode = passportData.countryCode;
    this.payment.passenger.issuingCountry = passportData.issuingCountry;
    this.payment.passenger.passportExpirationDate = passportData.passportExpirationDate;
    this.payment.passenger.passportNumber = passportData.passportNumber;
    this.payment.passenger.dateOfBirth = personalData.dateOfBirth;
    this.payment.passenger.email = personalData.email;
    this.payment.passenger.firstName = personalData.firstName;
    this.payment.passenger.lastName = personalData.lastName;
    this.payment.passenger.phone = personalData.phone;
    this.payment.passenger.title = personalData.title;
    // sessionStorage.clear();

    const somethig = this.purchaseService.purchaseTicket(this.payment);
    somethig.subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['../../'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }

  prevPage() {
    sessionStorage.setItem('card-form-value', JSON.stringify(this.cardDataForm.value));
    this.router.navigate(['../passport-data'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }
}
