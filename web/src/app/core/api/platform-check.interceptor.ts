import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY } from 'rxjs';

export const PlatformCheckInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) {
    // Annule totalement la requête côté serveur (SSR): aucune requête envoyée, aucun résultat.
    return EMPTY; // Observable vide -> rien ne part, rien ne revient.
  }

  const withHeader = req.clone({
    setHeaders: {
      'X-Client-Platform': 'browser',
    },
  });
  return next(withHeader);
};