import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

import { locale as es } from './langs/es';
import { locale as en } from './langs/es';

export interface Translation {
  lang: string;
  locale: any;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langIds: any = [];

  constructor(private translate: TranslateService) {
    this.loadTranslations(es, en);
    this.translate.setDefaultLang('es');
  }

  loadTranslations(...args: Translation[]): void {
    const locales = [...args];

    locales.forEach((locale) => {
      this.translate.setTranslation(locale.lang, locale.locale, true);
      this.langIds.push(locale.lang);
    });
    this.translate.addLangs(this.langIds);
    this.translate.use(this.getSelectedLanguage());
  }

  setLanguage(lang: string) {
    this.translate.use(this.translate.getDefaultLang());
    this.translate.use(lang);
    // manage logged user and change the lang here
  }

  getSelectedLanguage(): any {
    return (
      // get the logged user languaje preferences or the browser lang
      this.translate.getBrowserLang()
    );
  }
}
