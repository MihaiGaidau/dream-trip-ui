import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {environment} from '../../../environments/environment';
import {BoughtTicket} from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private readonly http: HttpClient,
              private readonly loaderService: LoaderService) {
  }

  public getTicketById(ticketId): Observable<BoughtTicket> {
    return this.loaderService.showLoaderUntilCompleted(this.http.get<BoughtTicket>(this.apiUrl + this.endpointUrl + `tickets/${ticketId}`));
  }
}
