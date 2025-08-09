import { Component, HostListener, OnInit, output } from '@angular/core';
import { AuthService, LoginCredentials, RegisterCredentials } from '../../../services/api/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ApiService } from '@services/api/api.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showLoginForm: boolean = false;
  isSignUpForm: boolean = false;
  authForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null; // This can be used for debug at try to login or create an account. Ej: errorMessage = res.message
  authSub: Subscription | null = null;
  showPassword: boolean = false;
  islogin = output<boolean>();

  passwordCriteria: Record<string, boolean> = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false
  };

  // Just to iterate in the .html
  passwordRules = [
    { key: 'minLength', label: 'login.req_password_minlen' },
    { key: 'uppercase', label: 'login.req_password_upper' },
    { key: 'lowercase', label: 'login.req_password_lower' },
    { key: 'number', label: 'login.req_password_number' },
    { key: 'symbol', label: 'login.req_password_symbol' }
  ];

  constructor(private api: ApiService, private fb: FormBuilder, private translate: TranslateService) {
    this.authForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/)]],
      repassword: ['']
    }, {
      validators: this.passwordMatchValidator
    });

    this.updateSignUpValidators();
  }

  ngOnInit(): void {
    this.authForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordCriteria['minLength'] = value?.length >= 6;
      this.passwordCriteria['uppercase'] = /[A-Z]/.test(value);
      this.passwordCriteria['lowercase'] = /[a-z]/.test(value);
      this.passwordCriteria['number'] = /\d/.test(value);
      this.passwordCriteria['symbol'] = /[^\w\s]/.test(value);
    });
  }

  showLogIn() {
    this.showLoginForm = true;
    this.resetFormState();
  }

  hideLogIn() {
    this.showLoginForm = false;
    this.isSignUpForm = false;
    this.resetFormState();
  }

  toggleLogIn() {
    this.showLoginForm = !this.showLoginForm;
    if (this.showLoginForm) {
      this.resetFormState();
    }
  }

  toggleSignUp() {
    this.isSignUpForm = !this.isSignUpForm;
    this.updateSignUpValidators();
    this.errorMessage = null;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    this.hideLogIn();
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = null;

    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    if (this.authSub) {
      this.authSub.unsubscribe();
    }

    if (this.isSignUpForm) {
      // Password and repassword check
      if (this.authForm.errors?.['passwordMismatch']) {
        this.errorMessage = this.translate.instant('login.err_repassword_match');
        this.isLoading = false;
        return;
      }

      const credentials: RegisterCredentials = {
        firstName: this.authForm.value.firstName,
        lastName: this.authForm.value.lastName,
        email: this.authForm.value.email,
        password: this.authForm.value.password
      };

      this.authSub = this.api.auth.register(credentials).subscribe({
        next: () => {
          this.isLoading = false;
          this.isSignUpForm = false;
          this.islogin.emit(true)
          this.updateSignUpValidators();
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = this.translate.instant('login.err_register_failed');
        }
      });
    } else {
      const credentials: LoginCredentials = {
        username: this.authForm.value.email,
        password: this.authForm.value.password
      }

      this.authSub = this.api.auth.login(credentials).subscribe({
        next: () => {
          this.isLoading = false;
          this.islogin.emit(true)
          this.hideLogIn();
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = this.translate.instant('login.err_login_failed');
        }
      });
    }
  }

  /* PRIVATES */
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const repassword = control.get('repassword');
    
    if (password && repassword && repassword.touched && password.value !== repassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // CLEANUPS
  private updateSignUpValidators() {
    const firstNameControl = this.authForm.get('firstName');
    const lastNameControl = this.authForm.get('lastName');
    const repasswordControl = this.authForm.get('repassword');
    
    if (this.isSignUpForm) {
      firstNameControl?.setValidators([Validators.required]);
      lastNameControl?.setValidators([Validators.required]);
      repasswordControl?.setValidators([Validators.required]);
    } else {
      firstNameControl?.clearValidators();
      lastNameControl?.clearValidators();
      repasswordControl?.clearValidators();

      firstNameControl?.reset('');
      lastNameControl?.reset('');
      repasswordControl?.reset('');
    }
    
    firstNameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
    repasswordControl?.updateValueAndValidity();
  }

  private resetFormState() {
    this.authForm.reset();
    this.isSignUpForm = false;
    this.errorMessage = null;
    this.isLoading = false;
    this.updateSignUpValidators();
    
    if (this.authSub) {
      this.authSub.unsubscribe();
      this.authSub = null;
    }
  }
}