import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavModel} from '../../../core/models/navModel';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../../core/services/utility.service';
import {UserModel} from '../../../core/models/user.model';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';
import {ToastService} from '../../../core/services/toast.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  displayLoginModal = false;
  public navLinks: NavModel[];
  public display: boolean;
  public user: UserModel;
  isLoggedIn = false;
  subscription: Subscription;
  search = '';
  isSearching = false;
  public currentUser: UserModel;
  public isAuthenticated: boolean;
  public isAdmin: boolean;

  constructor(public translateService: TranslateService,
              public router: Router,
              private utilityService: UtilityService,
              private authService: AuthService,
              private readonly toastService: ToastService,
              private readonly route: ActivatedRoute) {
    this.authService.currentUser$.subscribe((response: UserModel) => {
      this.currentUser = response;
      this.isAuthenticated = !!this.currentUser;
      if (this.currentUser) {
        this.currentUser.authorities.forEach((item) => {
          this.isAdmin = item.authority === 'ROLE_ADMIN';
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initNavLinks();
    this.subscription = this.authService.isLoggedIn.subscribe(value => {
        this.isLoggedIn = value;
      }
    );
  }

  /** init navbar links */
  private initNavLinks(): void {
    this.navLinks = [
      {link: 'header.nav.home', route: 'home'},
      {link: 'header.nav.about', route: 'about'},
      {link: 'header.nav.service', route: 'service'},
      {link: 'header.nav.contact', route: 'contact'}
    ];
  }

  /** generate translate in route */
  public generateTranslateRouteLink(lang: string): string {
    let url: string;
    if (this.router.url.includes('?')) {
      url = this.router.url.substring(0, this.router.url.lastIndexOf('?'));
    } else {
      url = this.router.url;
    }
    return url.replace(/^[/a-z]{3}/, '/' + lang);
  }

  public onDisplay(): void {
    this.display = true;
    this.utilityService.setDisplay(this.display);
  }

  onSelectLang(lang: string) {
    this.translateService.use(lang);
    sessionStorage.setItem('lang', lang);
  }


  public onOpenLogInModal() {
    this.displayLoginModal = !this.displayLoginModal;
    this.router.navigate(['auth']);
  }

  closeModal(isLoggin: boolean): void {
    console.log(isLoggin);
    this.displayLoginModal = isLoggin;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);

  }

  onSearchAviaDestination(): void {
    this.isSearching = !this.isSearching;
    console.log(this.search);
    this.router.navigate(['search'], {state: {data: this.search}});
    this.search = '';
  }

  onOpenAdminDashboard() {
    this.router.navigate(['../../admin-portal/airports/overview'], {relativeTo: this.route});
  }
}
