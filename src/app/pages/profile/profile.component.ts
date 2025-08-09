import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@services/api/users.service';
import { Observable } from 'rxjs';
import { IUser } from '@models/user';
import { EnumRoleUser } from '@models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$!: Observable<IUser>;
  private readonly roleMap: Record<EnumRoleUser, string> = {
  [EnumRoleUser.ADMIN]: 'Admin',
  [EnumRoleUser.USER]: 'User',
  [EnumRoleUser.VIP]: 'VIP',
  [EnumRoleUser.STAFF]: 'Staff'};

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.loadUser();
  }

  sendToHome(): void {
    this.router.navigate(['/']);
  }

  roleToString(role: EnumRoleUser): string {
    return this.roleMap[role] ?? 'User';
  }
  
  /* PRIVATES */
  private loadUser(): Observable<IUser> {
    return this.usersService.getCurrentUser();
  }
}
