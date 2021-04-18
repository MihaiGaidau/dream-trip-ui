import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  protected role: string;

  constructor(private router: Router,
              private authService: AuthService) {
    this.role = '';
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      currentUser.authorities.forEach((authority) => this.role = authority.authority);
    }
    if (currentUser && this.role === 'ROLE_ADMIN') {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }

}
