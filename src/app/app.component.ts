import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { TranslationService } from './common/i18n/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private translator: TranslationService) {}
}
