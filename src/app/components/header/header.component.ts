import { Component } from '@angular/core';
import { ThemeService } from '../../common/themes/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { LoginComponent } from "../../pages/auth/login/login.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen:boolean;
  itemsCounter: number;
  itemsSubtotal: number;

  constructor(public themeService: ThemeService, private router: Router, public auth: AuthService) {
    this.isMenuOpen = false;
    this.itemsCounter = 0;
    this.itemsSubtotal = 0;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get theme() : string {
    return this.themeService.getTheme() as string;
  }

  logOut() {
    this.auth.logOut();
  }
}
