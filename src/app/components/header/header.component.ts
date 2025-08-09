import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../common/themes/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { AppwriteService } from '@services/appwrite.service';
import { NgOptimizedImage } from '@angular/common';
import { UsersService } from '@services/api/users.service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '@models/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe, LoginComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean;
  itemsCounter: number;
  itemsSubtotal: number;

  user$ = new BehaviorSubject<IUser | null>(null);

  constructor(
    public themeService: ThemeService,
    private router: Router,
    protected auth: AuthService,
    protected users: UsersService,
    protected appwrite: AppwriteService
  ) {
    this.isMenuOpen = false;
    this.itemsCounter = 0;
    this.itemsSubtotal = 0;
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.users.getCurrentUser().subscribe((user) => {
        this.user$.next(user);
      });
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get theme(): string {
    return this.themeService.getTheme() as string;
  }
}
