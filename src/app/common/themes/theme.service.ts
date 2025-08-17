import { Injectable } from '@angular/core';
import { ThemeEnum } from './themes.enum';

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
  getTheme(): string {
    return this.currentTheme;
  }

  toggleTheme(): void {
    const next = this.currentTheme == ThemeEnum.THEME_LIGHT ? ThemeEnum.THEME_DARK : ThemeEnum.THEME_LIGHT;
    this.setTheme(next, true); 
  }

  /* PRIVATES */
  private setTheme(theme: ThemeEnum, persist: boolean): void {
    if (this.currentTheme == theme)
      return;

    this.currentTheme = theme;
    if (persist) {
      localStorage?.setItem(this.storageKey, theme as string);
    }
    document.documentElement.setAttribute('data-theme', theme as string);
  }

  private initTheme(): ThemeEnum {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.storageKey) as ThemeEnum | null;
        if (stored === ThemeEnum.THEME_DARK || stored === ThemeEnum.THEME_LIGHT) {
          this.setTheme(stored, false);
          return stored;
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const fallback = prefersDark ? ThemeEnum.THEME_DARK : ThemeEnum.THEME_LIGHT;
        this.setTheme(fallback, false);
        return fallback;
      } catch {}
    }

    return ThemeEnum.THEME_LIGHT;
  }

}
