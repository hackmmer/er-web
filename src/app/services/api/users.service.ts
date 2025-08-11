import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { IUser } from '@models/user';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseApi {
  public currentUser?: IUser;
  headers?: HttpHeaders;

  constructor(http: HttpClient, private authService: AuthService) {
    super(http, 'users');
  }

  getCurrentUser() {
    return this.get<IUser>().pipe(
      tap((user) => {
        this.currentUser = user;
      })
    );
  }


  /* PROFILE UPDATES */
  updateUserPhone(phone: string): Observable<IUser> {
    return this.patch<IUser>({
      headers: this.headers,
      body: { phone: phone }
    });
  }

}
