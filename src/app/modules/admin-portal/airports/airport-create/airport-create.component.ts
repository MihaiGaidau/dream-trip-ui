import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AirportService} from '../../../../core/services/airport.service';
import {ToastService} from '../../../../core/services/toast.service';
import {Location} from '@angular/common';
import {Airport, AirportData} from '../../../../core/models/airport.model';

@Component({
  selector: 'app-airport-create',
  templateUrl: './airport-create.component.html',
  styleUrls: ['./airport-create.component.scss']
})
export class AirportCreateComponent implements OnInit {


  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    code: new FormControl()
  });
  public airport: AirportData[];
  public airportId: number;
  public airportData: AirportData;

  constructor(private readonly router: Router,
              private readonly  route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly airportService: AirportService,
              private readonly toastService: ToastService,
              private readonly location: Location) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.airportId = params.id;
      if (this.airportId) {
        this.airportService.getAirportById(this.airportId).subscribe((response) => {
          this.airportData = response;
          this.onEditForm();
        });
      }
    });
    if (!this.airportId) {
      this.createForm();

    }

  }


  public onEditForm(): void {
    this.form = this.formBuilder.group({
      name: [this.airportData.name],
      city: [this.airportData.city],
      code: [this.airportData.code]
    });
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      city: [null],
      code: [null]
    });
  }

  public onSubmit(): void {
    if (this.airportId) {
      this.airportService.updateAirport(this.airportData.id, this.form.value).subscribe((airport) => {
        this.router.navigate(['../../overview'], {relativeTo: this.route});
      }, error => {
        this.router.navigate(['../../overview'], {relativeTo: this.route});
      });
    } else {
      this.airportService.createAirport(this.form.value).subscribe(airport => {
          this.router.navigate([`/admin-portal/airports/overview`]);
          setTimeout(() => {
            this.toastService.add({
              type: 'success',
              title: 'Created successfully',
              message: `airport was added`
            });
            this.form.reset();
          }, 200);
        }, error => {
          this.toastService.add({
            type: 'error',
            title: 'Culdn\'t create',
            message: 'airport with , verify connection or data'
          });
          this.form.reset();
        }
      );
    }

  }

  get name() {
    return this.form.get('name');
  }

  get city() {
    return this.form.get('city');
  }

  get code() {
    return this.form.get('code');
  }


  onGoBack(): void {
    this.location.back();
  }
}
