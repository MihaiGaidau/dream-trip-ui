import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly langs: string[] = ['ro', 'en', 'ru'];

  constructor(private translateService: TranslateService) {
    this.initDefaultTranslation();
  }


  /** init default translation */
  private initDefaultTranslation(): void {
    const lang = sessionStorage.getItem('lang');
    this.translateService.addLangs(this.langs);
    this.translateService.setDefaultLang('ro');
    this.translateService.use(lang ? lang : this.translateService.defaultLang);
  }
}
