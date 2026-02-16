import { effect, inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly cookieService = inject(CookieService);

  public isDarkMode = signal(this.cookieService.get('darkMode') === 'true' ? true : false);

  constructor() {
    effect(() => {
      if (this.isDarkMode()) {
        const element = document.querySelector('html');
        element!.classList.toggle('my-app-dark');
      } else {
        const element = document.querySelector('html');
        element!.classList.remove('my-app-dark');
      }
      this.cookieService.set('darkMode', this.isDarkMode().toString());
    });
  }
}
