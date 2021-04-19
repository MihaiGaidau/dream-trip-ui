import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser$: Observable<UserModel>;
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;
  private currentUserSubject: BehaviorSubject<UserModel>;
  public userId: BehaviorSubject<any>;
  public getUserId: Observable<any>;
  isLoggedIn = new BehaviorSubject<boolean>(false);
  private tokenExpiratationTimer: any;

  constructor(private http: HttpClient,
              private readonly toastService: ToastService) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.userId = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userId')));
    this.getUserId = this.userId.asObservable();
  }

  public get currentUser(): UserModel {
    let user: UserModel;
    this.currentUser$.subscribe((response) => {
      return user = response;
    });
    return user;
  }

  /** login    */
  public login(body): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}${this.endpointUrl}auth/sign-in`, body)
      .pipe(tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('jwt_token', JSON.stringify(user.token));
        this.currentUserSubject.next(user);
        // this.isLoggedIn.next(true);
        this.autoLogout(1000 * 600);
        // this.getUserByUsername();
        return user;
      }));
  }

  /** logout    */
  public logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwt_token');
    this.currentUserSubject.next(null);
    this.isLoggedIn.next(false);
    if (this.tokenExpiratationTimer) {
      clearTimeout(this.tokenExpiratationTimer);
    }
    this.toastService.add({
      type: 'success',
      title: 'You logged out from admin successfully',
      message: 'Good luck !'
    });
    this.tokenExpiratationTimer = null;
  }

  private autoLogout(expirationDuration: number): void {
    this.tokenExpiratationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // /** get user by username   */
  // public getUserByUsername(): void {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   this.http.get(this.apiUrl + this.endpointUrl + `users/${currentUser.username}`)
  //     .subscribe((user) => {
  //       localStorage.setItem('userId', JSON.stringify(user));
  //       this.userId.next(JSON.parse(localStorage.getItem('userId')));
  //     });
  // }
}
