import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../common/themes/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { LoginComponent } from "../../pages/auth/login/login.component";
import { UsersService } from '@services/api/users.service';
import { IUser } from '@models/user';

import { EnumRoleUser } from '@models/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuOpen:boolean;
  itemsCounter: number;
  itemsSubtotal: number;

  userRole!:EnumRoleUser;
  isLoguin:boolean;

  constructor(public themeService: ThemeService, private router: Router, public auth: AuthService, private userService:UsersService) {
    this.isMenuOpen = false;
    this.itemsCounter = 0;
    this.itemsSubtotal = 0;

    this.isLoguin = this.auth.isLoggedIn();
  }

  ngOnInit(): void {
    this.loggedIn();
  }

  private loggedIn(){
    if(this.isLoguin){
      this.userService.getCurrentUser().subscribe(u=>{
        this.userRole = u.role
      })
    }
  }

  recibe_login(v:boolean){
    this.isLoguin = v;
    this.loggedIn()
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get theme() : string {
    return this.themeService.getTheme() as string;
  }

  logOut() {
    this.auth.logOut();
    this.isLoguin = false;
  }
}
