import { Injectable } from '@angular/core';
import { ThemeEnum } from '../shared/enums/themes.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: ThemeEnum;
  private readonly storageKey: string = "app-theme";

  constructor() {
    this.currentTheme = this.initTheme();
  }
  
  /* THEMES HANDLERS */
  getTheme() : string {
    return this.currentTheme;
  }

  toggleTheme() {
    const next = this.currentTheme == ThemeEnum.THEME_LIGHT ? ThemeEnum.THEME_DARK : ThemeEnum.THEME_LIGHT;
    this.setTheme(next); 
  }

  /* PRIVATES */
  private setTheme(theme: ThemeEnum) {
    if (this.currentTheme == theme)
      return;

    this.currentTheme = theme;
    localStorage?.setItem(this.storageKey, theme as string);
    document.documentElement.setAttribute('data-theme', theme as string);
  }

  private initTheme(): ThemeEnum {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(this.storageKey) as ThemeEnum;
      this.setTheme(stored);
    } catch {}
  }
  return ThemeEnum.THEME_LIGHT;
}

}
