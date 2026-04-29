import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './core/notification/notification-component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ThemeService } from './core/theme/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, ConfirmDialogModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-cloud');

  constructor(private readonly themeService: ThemeService) {
  }
}
