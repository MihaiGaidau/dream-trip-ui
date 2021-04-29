import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PassportData, PersonalData} from '../../../../../../core/models/payment.model';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  @Output() personalDataEvent: EventEmitter<PersonalData> = new EventEmitter<PersonalData>();
  public personalDataForm: FormGroup;
  public titles: any[];

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const value = sessionStorage.getItem('personal-form-value');
    if (value){
      const personalData = JSON.parse(value) as PersonalData;
      this.personalDataForm = this.formBuilder.group({
        dateOfBirth: [personalData.dateOfBirth, Validators.compose([Validators.required])],
        email: [personalData.email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        firstName: [personalData.firstName, Validators.compose([Validators.required])],
        lastName: [personalData.lastName, Validators.compose([Validators.required])],
        phone: [personalData.phone, Validators.compose([Validators.required])],
        title: [personalData.title, Validators.compose([Validators.required])],
      });
    }
    else {
      this.initPersonalDataForm();
    }
    this.titles = [
      {name: 'Mr', code: 'A', factor: 1},
      {name: 'Ms', code: 'B', factor: 2},
    ];
  }

  private initPersonalDataForm(): void {
    this.personalDataForm = this.formBuilder.group({
      dateOfBirth: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    this.personalDataEvent.emit(this.personalDataForm.value);
  }

  nextPage() {
    sessionStorage.setItem('personal-form-value', JSON.stringify(this.personalDataForm.value));
    // this.personalDataEvent.emit(this.personalDataForm.value);
    this.router.navigate(['../passport-data'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }

  prevPage() {
    this.router.navigate(['steps/personal-data']);
  }
}
