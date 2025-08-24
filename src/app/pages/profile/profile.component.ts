import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@services/api/users.service';
import { Observable } from 'rxjs';
import { IUser, notificationChannelsEnum } from '@models/user';
import { ProfilePipe } from '@pipes/profile.pipe';
import { DietaryPreferencesModalComponent } from '../../modals/dietary-preferences/dietary-preferences.component';

class BaseEditState {
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
  }
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProfilePipe, DietaryPreferencesModalComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private readonly usersService: UsersService = inject(UsersService);
  private readonly router: Router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);

  user = signal<IUser | undefined>(undefined);
  dietaryModalOpen = signal(false);
  allDietaryPreferences = [
    'Vegetariano', 'Vegano', 'Sin gluten', 'Sin lactosa', 
    'Keto', 'Paleo', 'Bajo en sodio', 'Pescetariano',
    'Sin nueces', 'Bajo en carbohidratos', 'Sin mariscos'
  ];
  phoneState: BaseEditState = new BaseEditState();

  form!: FormGroup;

  ngOnInit(): void {
    this.loadUser().subscribe((user) => {
      this.user.set(user);
      this.initUpdateForm(this.user());
    });

    this.initUpdateForm();
  }

  submit(section: string) {
    const data = this.form.get(section)?.getRawValue();
    switch (section) {
      case 'profileImage':
        this.usersService
          .updateProfileImage(data)
          .subscribe((e) => this._afterUpdate(e, section));
        return;
      case 'personalInfo':
        this.usersService
          .updatePersonalInfo(data)
          .subscribe((e) => this._afterUpdate(e, section));
        return;
      case 'dietaryPreferences':
        const preferences = data as string[];
        this.usersService.updateDietaryPreferences(preferences)
          .subscribe(updatedUser => this._afterUpdate(updatedUser, section));
        return;
      case 'notificationChannels':
        this.usersService
          .updateNotificationsChannels(data)
          .subscribe((e) => this._afterUpdate(e, section));
        return;
    }
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
      this.phoneState.isEditing = true;
      this.handleControl(this.form.get('personalInfo.phone'), true);
    }
  }

  saveNewPhoneNumber(): void {
    this.phoneState.startLoading();
    const phoneControl = this.form.get('personalInfo.phone');
    this.handleControl(phoneControl, false);

    this.usersService.updateUserPhone(phoneControl?.value).subscribe({
      next: (updatedUser) => {
        this.user.set(updatedUser);
        this.phoneState.reset();
        this.handleControl(phoneControl, true);
      },
      error: (err) => {
        this.handleControl(phoneControl, true);
        this.phoneState.setError(err.error.message[0]);
        // console.error('Update phone error:', err);                 // Just for debug
      },
    });
  }
  /* END HANDLE PHONE NUMBER */

  /* HANDLE DIETARY PREFERENCES */
  openDietaryPreferencesModal(): void {
    this.dietaryModalOpen.set(true);
  }
  
  saveDietaryPreferences(preferences: string[]): void {
    this.updateDietaryPreferencesInForm(preferences);
    this.dietaryModalOpen.set(false);
    this.submit('dietaryPreferences');
  }

  private updateDietaryPreferencesInForm(preferences: string[]): void {
    const dietaryArray = this.form.get('dietaryPreferences') as FormArray;
    dietaryArray.clear();
    preferences.forEach(preference => {
      dietaryArray.push(this.fb.control(preference));
    });
    dietaryArray.markAsDirty();
  }
  /* END DIETARY PREFERENCES */

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
    if (!notifications) return;
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

  updateNotiChannel(channel: string) {}

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
        phone: this.fb.control(
          {
            value: user?.phone || '',
            disabled: !this.phoneState.isEditing,
          },
          []
        ),
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

  private _afterUpdate(r: IUser, section: string) {
    console.log(r);                                   // Just remember commet this later...
    this.user.set(r);
    this.form.get(section)?.markAsUntouched();
    this.form.get(section)?.markAsPristine();
  }

  private handleControl(control: AbstractControl | null, enable: boolean) {
    enable ? control?.enable() : control?.disable();
    control?.markAsPristine();
  }

  OBJECTS = Object;
}
