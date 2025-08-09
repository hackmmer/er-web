import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../common/themes/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { AppwriteService } from '@services/appwrite.service';
import { NgOptimizedImage } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { EnumRoleUser, IUser } from '@models/user';
import { ApiService } from '@services/api/api.service';

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
  user!:IUser | null;

  constructor(
    public themeService: ThemeService,
    protected api: ApiService,
    protected appwrite: AppwriteService) {
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

  recibe_login(v:boolean){
    this.loggedIn()
  }

  logOut() {
    this.api.auth.logOut();
    this.user=null
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get theme(): string {
    return this.themeService.getTheme() as string;
  }
}
