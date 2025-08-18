import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { IUser, UserUpdates } from '@models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseApi {
  public currentUser?: IUser;

  constructor(http: HttpClient) {
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
      body: { phone: phone },
    });
  }

  updateProfileImage(data: UserUpdates.profileImage): Observable<IUser> {
    return this.patch<IUser>({
      endpoint: 'image',
      body: data,
    });
  }

  deleteProfileImage(data: UserUpdates.profileImage): Observable<IUser> {
    return this.delete<IUser>({ endpoint: 'image' });
  }

  updatePersonalInfo(data: UserUpdates.personalInfo): Observable<IUser> {
    return this.patch<IUser>({
      body: data,
    });
  }

  updateNotificationsChannels(
    data: UserUpdates.notificationChannels
  ): Observable<IUser> {
    return this.patch<IUser>({
      endpoint: 'preferences/notification-channel',
      body: data,
    });
  }

  updateDietaryPreferences(preferences: string[]): Observable<IUser> {
    console.log(preferences);
    return this.patch<IUser>({
      endpoint: 'preferences/dietary',
      body:{ 
        dietaryPreferences: preferences
      }
    });
}
}
