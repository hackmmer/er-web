import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@services/api/users.service';
import { Observable, take } from 'rxjs';
import { IUser } from '@models/user';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$!: Observable<IUser>;
  phoneState: PhoneEditState = new PhoneEditState();
  
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.loadUser();
    this.user$.subscribe(user => {
      this.phoneState.newPhoneNumber = user.phone || '';
    });
  }

  sendToHome(): void {
    this.router.navigate(['/']);
  }

  /* HANDLE PHONE NUMBER */
  toggleEditingPhone(): void {
    if (this.phoneState.isEditing) {  // If are editing and click "Guardar"
      this.saveNewPhoneNumber();
    } else {                          // If click "Editar" or "Añadir numero"
      this.user$.pipe(take(1)).subscribe(user => {
        this.phoneState.newPhoneNumber = user.phone || '';  // Get the current phone number
        this.phoneState.isEditing = true; 
      });
    }
  }

  saveNewPhoneNumber(): void {
    this.phoneState.startLoading();
    
    this.usersService.updateUserPhone(this.phoneState.newPhoneNumber).subscribe({
      next: (updatedUser) => {
        this.user$ = this.loadUser();
        this.phoneState.reset();
      },
      error: (err) => {
        this.phoneState.setError('Error al actualizar el teléfono.');
        // console.error('Update phone error:', err);                 // Just for debug
      }
    });
  }
  /* END HANDLE PHONE NUMBER */

  /* HANDLE EMAIL */


  /* PRIVATES */
  private loadUser(): Observable<IUser> {
    return this.usersService.getCurrentUser();
  }
}
