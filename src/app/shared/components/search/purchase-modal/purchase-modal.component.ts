import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../../core/services/toast.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.scss']
})
export class PurchaseModalComponent implements OnInit {
  public buyForm: FormGroup;
  items: MenuItem[];
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  public error: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly toastService: ToastService) {
    this.error = '';
    this.initBuyForm();
  }

  private initBuyForm(): void {
    this.buyForm = this.formBuilder.group({
      cardCvv: [null, Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3)])],
      cardExpirationDate: [null, Validators.compose([Validators.required])],
      cardHolderName: [null, Validators.compose([Validators.required])],
      cardNumber: [null, Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16)])],
    });
  }


  public onPurchase(): void {
    console.log(this.buyForm.value);
    this.authService.login(this.buyForm.value).subscribe(data => {
      this.toastService.add({
        type: 'success',
        title: 'The payment was successfully',
        message: 'Enjoy your trip !'
      });
      this.buyForm.reset();
      this.error = '';
      this.router.navigate(['admin-portal/airports']);
    }, error => {
      this.error = error;
    });
    this.onClose();
  }

  onClose(): void {
    this.closeModal.emit(false);
  }

  ngOnInit() {
    this.items = [{
      label: 'Personal data',
      routerLink: 'personal'
    },
      {
        label: 'Seat',
        routerLink: 'seat'
      },
      {
        label: 'Payment',
        routerLink: 'payment'
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation'
      }
    ];
  }

}
