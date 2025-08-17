import {
  Component,
  Renderer2,
  ElementRef,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { notificationType } from '@models/notifications';
import { NotificationsService } from '@services/notifications.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnDestroy {
  private readonly _renderer = inject(Renderer2);
  private readonly _notifications = inject(NotificationsService);

  @ViewChild('toastHolder') toastHolder!: ElementRef;
  private subscription: Subscription;

  constructor() {
    this.subscription = this._notifications.notification$.subscribe(
      (notification) => {
        if (notification)
          this.createNotification(notification.message, notification.type);
      }
    );
  }

  createNotification(message: string, type: notificationType = 'success') {
    const div = this._renderer.createElement('div');
    const span = this._renderer.createElement('span');
    const text = this._renderer.createText(message);

    // Configuración de clases y estructura
    this._renderer.addClass(div, 'alert');
    this._renderer.addClass(div, `alert-${type}`);
    this._renderer.appendChild(div, span);
    this._renderer.appendChild(span, text);
    this._renderer.appendChild(this.toastHolder.nativeElement, div);

    // Auto-eliminación después de 5 segundos
    setTimeout(() => {
      this._renderer.addClass(div, 'opacity-0');
      setTimeout(
        () => this._renderer.removeChild(this.toastHolder.nativeElement, div),
        500
      );
    }, 5000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
