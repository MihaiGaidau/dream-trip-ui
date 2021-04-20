import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.scss']
})
export class PurchaseModalComponent {
  public formLogin: FormGroup = this.formBuilder.group({
    username: [null, Validators.compose([Validators.required])],
    password: [null, Validators.compose([Validators.required])]
  });
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  public error: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly toastService: ToastService) {
    this.error = '';
  }


  public onPurchase(): void {
    console.log(this.formLogin.value);
    this.authService.login(this.formLogin.value).subscribe(data => {
      this.toastService.add({
        type: 'success',
        title: 'You logged in as admin successfully',
        message: 'Welcome back !'
      });
      this.formLogin.reset();
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

}
