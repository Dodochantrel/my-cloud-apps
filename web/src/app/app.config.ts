import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BearerTokenInterceptor } from './core/auth/bearer-token.interceptor';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PrimeNgPreset } from './primeng.config';
import { fr } from "primelocale/fr.json";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    MessageService, // Pour ToastModule de PrimeNG
    ConfirmationService, // Pour ToastModule de PrimeNG
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([BearerTokenInterceptor])),
    providePrimeNG({
      translation: fr,
      theme: {
        preset: PrimeNgPreset,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
              name: 'primeng',
              order: 'theme, base, primeng'
          }
        }
      },
    }),
  ]
};
