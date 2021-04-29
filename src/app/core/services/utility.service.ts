import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {


  constructor() {
    this.display = new BehaviorSubject<boolean>(false);
  }

  public display: BehaviorSubject<boolean>;

  static parseDate(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
      + '-' + ('0' + date.getDate()).slice(-2);
  }

  public setDisplay(value): void {
    this.display.next(value);
  }
}
