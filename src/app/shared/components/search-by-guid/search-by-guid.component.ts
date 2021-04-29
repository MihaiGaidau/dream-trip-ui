import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastService} from '../../../core/services/toast.service';
import {TicketService} from '../../../core/services/ticket.service';
import {switchMap} from 'rxjs/operators';
import {BoughtTicket} from '../../../core/models/ticket.model';

@Component({
  selector: 'app-search-by-guid',
  templateUrl: './search-by-guid.component.html',
  styleUrls: ['./search-by-guid.component.scss']
})
export class SearchByGuidComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  public error: string;

  public ticket: BoughtTicket;

  constructor(private formBuilder: FormBuilder,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly ticketService: TicketService,
              private readonly toastService: ToastService) {
  }

  ngOnInit(): void {
    console.log('gotHere');
    this.getSearchFlights();
  }

  // public onLogin(): void {
  //   // console.log(this.formLogin.value);
  //   this.ticketService.login(this.formLogin.value).subscribe(data => {
  //     this.toastService.add({
  //       type: 'success',
  //       title: 'You logged in as admin successfully',
  //       message: 'Welcome back !'
  //     });
  //     this.formLogin.reset();
  //     this.error = '';
  //     // this.router.navigate(['admin-portal/airports']);
  //   }, error => {
  //     this.error = error;
  //   });
  //   this.onClose();
  // }

  onClose(): void {
    this.closeModal.emit(false);
    this.router.navigate(['']);
    // window.location.reload();

  }

  private getSearchFlights(): void {

    this.route.queryParamMap.pipe(
      switchMap((params: Params) => {
        console.log(params);
        return this.ticketService.getTicketById(params.params.guid);
        // console.log(params);
        // return of();
      })
    ).subscribe(ticket => {
      console.log('ticket');
      console.log(ticket);
      this.ticket = ticket;
    }, error => {
      console.log('ticketError');
      console.log(error);
    });
  }

}
