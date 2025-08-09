import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  private _isNotBrowser = false;

  constructor( @Inject(PLATFORM_ID) platformId: Object ) {
    this._isNotBrowser = !isPlatformBrowser(platformId);
  }

  set(key: string, value: string) {
    if(this._isNotBrowser) return;
    localStorage.setItem(key, value);
  }

  get(key: string) {
    if(this._isNotBrowser) return;
    return localStorage.getItem(key);
  }

  remove(key: string) {
    if(this._isNotBrowser) return;
    localStorage.removeItem(key);
  }
}
