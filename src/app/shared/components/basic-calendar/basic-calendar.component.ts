import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-basic-calendar',
  templateUrl: './basic-calendar.component.html',
  styleUrls: ['./basic-calendar.component.scss']
})
export class BasicCalendarComponent implements OnInit {

  @Input() formControlName: string;
  value: Date;

  constructor() {
   }

  
  ngOnInit(): void {
  }
  

}
