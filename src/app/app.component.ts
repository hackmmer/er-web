import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslationService } from './common/i18n/translation.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private translator: TranslationService) {}
}
