import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {CardData, PassportData, PersonalData} from '../../../../../core/models/payment.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  items: MenuItem[];
  @Input() personalData: PersonalData;
  @Input() passportData: PassportData;
  @Input() cardData: CardData;

  constructor() {
  }

  ngOnInit(): void {
    console.log('got here');
    this.items = [{
      label: 'Personal',
      routerLink: 'personal-data'
    },
      {
        label: 'Passport',
        routerLink: 'passport-data'
      },
      {
        label: 'Card',
        routerLink: 'card-data'
      }
    ];
  }

}
