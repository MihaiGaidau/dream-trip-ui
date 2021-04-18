import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Departure} from '../../../core/models/departure.model';
import {SearchFlightService} from '../../../core/services/search-flight.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  public departureForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sfService: SearchFlightService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {

    this.initDepartureForm();
  }

  get oneWayValue(): boolean {
    return this.departureForm.get('oneWay').value;
  }

  ngOnInit(): void {
  }

  private initDepartureForm(): void {
    this.departureForm = this.formBuilder.group({
      fromDestination: [null],
      toDestination: [null],
      fromDate: [null, Validators.compose([Validators.required])],
      toDate: [null],
      passengers: [null],
      oneWay: [true]
    });
  }

  public onGetOneWayValue(isChecked: boolean): void {
    this.departureForm.get('oneWay').setValue(isChecked);
    console.log(this.oneWayValue);

  }

  public onSubmit(): void {
    const departure = {
      fromDate: this.departureForm.value.fromDate,
      fromDestination: this.departureForm.value.fromDestination,
      oneWay: this.departureForm.value.oneWay,
      passengers: this.departureForm.value.passengers,
      toDate: this.departureForm.value.toDate,
      toDestination: this.departureForm.value.toDestination,
    } as Departure;
    this.router.navigate(['search'], {relativeTo: this.route, state: {data: departure}});
  }

}
