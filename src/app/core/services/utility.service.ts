import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public display: BehaviorSubject<boolean>;


  constructor() {
    this.display = new BehaviorSubject<boolean>(false);
  }

  public setDisplay(value): void {
    this.display.next(value);
  }
}
