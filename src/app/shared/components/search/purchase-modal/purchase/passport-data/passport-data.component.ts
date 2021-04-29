import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CardData, PassportData} from '../../../../../../core/models/payment.model';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';

@Component({
  selector: 'app-passport-data',
  templateUrl: './passport-data.component.html',
  styleUrls: ['./passport-data.component.scss']
})
export class PassportDataComponent implements OnInit {

  public passportDataForm: FormGroup;
  @Output() passportDataEvent: EventEmitter<PassportData> = new EventEmitter<PassportData>();

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const value = sessionStorage.getItem('passport-form-value');
    if (value) {
      const passportData = JSON.parse(value) as PassportData;
      this.passportDataForm = this.formBuilder.group({
        citizenship: [passportData.citizenship, Validators.compose([Validators.required])],
        countryCode: [passportData.countryCode, Validators.compose([Validators.required])],
        issuingCountry: [passportData.issuingCountry, Validators.compose([Validators.required])],
        passportExpirationDate: [passportData.passportExpirationDate, Validators.compose([Validators.required])],
        passportNumber: [passportData.passportNumber, Validators.compose([Validators.required, Validators.pattern('^(?!^0+$)[a-zA-Z0-9]{3,20}$')])],
      });
    } else {
      this.initPassportForm();
    }
  }

  onSubmit() {
    this.passportDataEvent.emit(this.passportDataForm.value);
  }

  private initPassportForm(): void {
    this.passportDataForm = this.formBuilder.group({
      citizenship: [null, Validators.compose([Validators.required])],
      countryCode: [null, Validators.compose([Validators.required])],
      issuingCountry: [null, Validators.compose([Validators.required])],
      passportExpirationDate: [null, Validators.compose([Validators.required])],
      passportNumber: [null, Validators.compose([Validators.required, Validators.pattern('^(?!^0+$)[a-zA-Z0-9]{3,20}$')])],
    });
  }

  nextPage() {
    // JSON.parse(sessionStorage.getItem('purchase-form-value'));
    sessionStorage.setItem('passport-form-value', JSON.stringify(this.passportDataForm.value));
    // this.personalDataEvent.emit(this.personalDataForm.value);
    this.router.navigate(['../card-data'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }

  prevPage() {
    sessionStorage.setItem('passport-form-value', JSON.stringify(this.passportDataForm.value));
    this.router.navigate(['../personal-data'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }
}
