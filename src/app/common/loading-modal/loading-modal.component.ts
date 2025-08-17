// En el archivo TS del componente
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent {
  @Input() isVisible = false;

  preventClose(event: Event) {
    event.stopPropagation();
  }
}