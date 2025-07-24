import { Component } from '@angular/core';
import { ThemeService } from '../../common/themes/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen:boolean;
  itemsCounter: number;
  itemsSubtotal: number;

  constructor(public themeService: ThemeService, private router: Router) {
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
}
