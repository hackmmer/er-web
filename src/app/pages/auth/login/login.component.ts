import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../services/api/auth.service';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showLoginForm: boolean = false;
  isSignUpForm: boolean = false;
  constructor(private authService: AuthService) {}

  toggleLogIn() {
    this.showLoginForm = !this.showLoginForm;
  }

  toggleSignUp() {
    this.isSignUpForm = !this.isSignUpForm;
  }

  showLogIn() {
    this.showLoginForm = true;
  }

  hideLogIn() {
    this.showLoginForm = false;
    this.isSignUpForm = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    this.hideLogIn();
  }
}