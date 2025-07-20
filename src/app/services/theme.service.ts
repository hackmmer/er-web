import { Injectable } from '@angular/core';
import { ThemeEnum } from '../shared/enums/themes.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey: string = "app-theme";

  constructor() {
    let storedTheme: ThemeEnum = ThemeEnum.THEME_DARK;
    if (localStorage != null)
      storedTheme = localStorage.getItem(this.storageKey) as ThemeEnum || ThemeEnum.THEME_DARK;
    this.theme = storedTheme;
  }
  
  /* THEMES HANDLERS */
  get currentTheme() : string {
    return localStorage.getItem(this.storageKey) || ThemeEnum.THEME_DARK;
  }

  set theme(theme: ThemeEnum) {
    if (this.currentTheme == theme)
      return;

    localStorage.setItem(this.storageKey, theme as string);
    document.documentElement.setAttribute('data-theme', theme as string);
  }

  toggleTheme() {
    const next = this.currentTheme == ThemeEnum.THEME_LIGHT ? ThemeEnum.THEME_DARK : ThemeEnum.THEME_LIGHT;
    this.theme = next; 
  }
}
