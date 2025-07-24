import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
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

  go_menu(){
    this.router.navigate(['menu'])
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get theme() : string {
    return this.themeService.getTheme() as string;
  }
}
