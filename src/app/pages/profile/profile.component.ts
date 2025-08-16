import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@services/api/users.service';
import { Observable, take } from 'rxjs';
import { IUser, notificationChannelsEnum } from '@models/user';
import { ProfilePipe } from '@pipes/profile.pipe';

abstract class BaseEditState {
  isEditing: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  startLoading() {
    this.isLoading = true;
    this.error = null;
  }

  stopLoading() {
    this.isLoading = false;
  }

  setError(message: string) {
    this.error = message;
    this.isLoading = false;
  }

  reset() {
    this.isEditing = false;
    this.stopLoading();
    this.error = null;
    this.resetState();
  }

  protected abstract resetState(): void;
}

class PhoneEditState extends BaseEditState {
  newPhoneNumber: string = '';

  protected override resetState() {
    this.newPhoneNumber = '';
  }
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProfilePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private readonly usersService: UsersService = inject(UsersService);
  private readonly router: Router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);

  user = signal<IUser | undefined>(undefined);
  phoneState: PhoneEditState = new PhoneEditState();

  form!: FormGroup;

  ngOnInit(): void {
    this.loadUser().subscribe((user) => {
      this.user.set(user);
      this.phoneState.newPhoneNumber = user.phone || '';
      this.initUpdateForm(this.user());
    });

    this.initUpdateForm();
  }

  submit(section: string) {
    console.log(this.form.getRawValue())
  }

  sendToHome(): void {
    this.router.navigate(['/']);
  }

  /* HANDLE PHONE NUMBER */
  toggleEditingPhone(): void {
    if (this.phoneState.isEditing) {
      // If are editing and click "Guardar"
      this.saveNewPhoneNumber();
    } else {
      // If click "Editar" or "Añadir numero"
      const user = this.user();
      if (!user) return;
      this.phoneState.newPhoneNumber = user.phone || ''; // Get the current phone number
      this.phoneState.isEditing = true;
    }
  }

  saveNewPhoneNumber(): void {
    this.phoneState.startLoading();

    this.usersService
      .updateUserPhone(this.phoneState.newPhoneNumber)
      .subscribe({
        next: (updatedUser) => {
          this.user.set(updatedUser);
          this.phoneState.reset();
        },
        error: (err) => {
          this.phoneState.setError(err.error.message[0]);
          // console.error('Update phone error:', err);                 // Just for debug
        },
      });
  }
  /* END HANDLE PHONE NUMBER */

  /* HANDLE EMAIL */

  /* HANDLE NOTIFICATION CHANNELS */

  getNotificationChannel(channel: string) {
    switch (channel) {
      case notificationChannelsEnum.email:
        return this.user()?.notificationChannels.email;
      case notificationChannelsEnum.sms:
        return this.user()?.notificationChannels.sms;
      case notificationChannelsEnum.whatsapp:
        return this.user()?.notificationChannels.whatsapp;
      case notificationChannelsEnum.push:
        return this.user()?.notificationChannels.push;
    }
    return false;
  }

  toggleNotificationChannel(channel: string) {
    const notifications = this.user()?.notificationChannels;
    if (!notifications)
      return
    switch (channel) {
      case notificationChannelsEnum.email:
        notifications.email = !notifications.email;
        return;
      case notificationChannelsEnum.sms:
        notifications.sms = !notifications.sms;
        return;
      case notificationChannelsEnum.whatsapp:
        notifications.whatsapp = !notifications.whatsapp;
        return;
      case notificationChannelsEnum.push:
        notifications.push = !notifications.push;
        return;
    }

  }

  updateNotiChannel(channel: string) {

  }

  /* END HANDLE NOTIFICATION CHANNELS */

  /* PRIVATES */
  private loadUser(): Observable<IUser> {
    return this.usersService.getCurrentUser();
  }

  private initUpdateForm(user?: IUser) {
    this.form = this.fb.group({
      profileImage: this.fb.control(user?.profileImage || '', []),
      personalInfo: this.fb.group({
        firstName: this.fb.control(user?.firstName || '', []),
        lastName: this.fb.control(user?.lastName || '', []),
        phone: this.fb.control(user?.phone || '', []),
      }),
      dietaryPreferences: this.fb.array([], []),
      notificationChannels: this.fb.group({
        email: this.fb.control(user?.notificationChannels.email || false, []),
        sms: this.fb.control(user?.notificationChannels.sms || false, []),
        whatsapp: this.fb.control(
          user?.notificationChannels.whatsapp || false,
          []
        ),
        push: this.fb.control(user?.notificationChannels.push || false, []),
      }),
    });
  }

  OBJECTS = Object;
}
