import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslationService } from '@common/i18n/translation.service';
import { HeaderComponent } from '@components/header/header.component';

import { LoadingService } from '@services/loading.service';
import { LoadingModalComponent } from '@components/loading-modal/loading-modal.component';
import { NotificationsComponent } from '@components/notifications/notifications.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoadingModalComponent,
    CommonModule,
    NotificationsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private translator: TranslationService,
    public loadingService: LoadingService
  ) {}
}
