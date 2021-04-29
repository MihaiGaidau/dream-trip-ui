import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {Observable} from 'rxjs';
import {Payment} from '../models/payment.model';
import {Ticket} from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private readonly http: HttpClient,
              private readonly  loaderService: LoaderService) { }

  public purchaseTicket(body: Payment): Observable<Ticket> {
    return this.loaderService.showLoaderUntilCompleted(this.http.post<Ticket>(this.apiUrl + this.endpointUrl + 'purchases', body));
  }
}
