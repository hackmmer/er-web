import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../common/themes/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, Router } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { AppwriteService } from '@services/appwrite.service';
import { NgOptimizedImage } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '@models/user';
import { ApiService } from '@services/api/api.service';
import { ProfilePipe } from "@pipes/profile.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe, LoginComponent, NgOptimizedImage, ProfilePipe, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean;
  itemsCounter: number;
  itemsSubtotal: number;

  showMobileLogin: boolean = false;

  user$ = new BehaviorSubject<IUser | null>(null);
  user!:IUser | null;

  showMobileSearch: boolean = false; // Control para búsqueda móvil
  searchActive: boolean = false;     // Control para búsqueda en desktop
  searchTerm: string = '';           // Término de búsqueda

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    public themeService: ThemeService,
    protected api: ApiService,
    protected appwrite: AppwriteService,
    private router:Router) {
    this.isMenuOpen = false;
    this.itemsCounter = 0;
    this.itemsSubtotal = 0;
  }

  ngOnInit(): void {
    this.loggedIn()
  }

  private loggedIn(){
    if(this.api.auth.isLoggedIn()){
      this.api.users.getCurrentUser().subscribe(u=>{
        this.user$.next(u);
        this.user = this.user$.getValue()
      })
    }
  }

  logOut() {
    this.api.auth.logOut();
    this.user=null
    this.router.navigate([''])
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get theme(): string {
    return this.themeService.getTheme() as string;
  }

  handleMobileLogin(success: boolean) {
    this.showMobileLogin = false;
    if (success) {
        this.loggedIn();
    }
  }

  // Toggle para búsqueda en desktop
  toggleSearch() {
    this.searchActive = !this.searchActive;
    if (this.searchActive) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 300);
    } else {
      this.searchTerm = '';
    }
  }

  // Realizar la búsqueda
  performSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchTerm.trim() } 
      });
      
      // Cerrar los modales de búsqueda
      this.searchActive = false;
      this.showMobileSearch = false;
    }
  }
}
