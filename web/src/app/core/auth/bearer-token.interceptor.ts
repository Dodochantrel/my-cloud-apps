import {
  HttpBackend,
  HttpClient,
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { CookieService } from '../cookie/cookie.service';
import { environment } from '../../../environments/environment';

const SKIP_REFRESH_ROUTES = [
  'authentications/login',
  'authentications/register',
  'authentications/refresh',
];

const RETRIED_AFTER_REFRESH = new HttpContextToken<boolean>(() => false);

let refreshAccessTokenRequest$: Observable<string> | null = null;

function shouldSkipRefresh(url: string): boolean {
  return SKIP_REFRESH_ROUTES.some((route) => url.includes(route));
}

function getAccessTokenOrThrow(cookieService: CookieService): string {
  const accessToken = cookieService.get('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing after refresh.');
  }
  return accessToken;
}

function refreshAccessToken(rawHttpClient: HttpClient, cookieService: CookieService): Observable<string> {
  if (!refreshAccessTokenRequest$) {
    refreshAccessTokenRequest$ = rawHttpClient
      .post(`${environment.apiUrl}authentications/refresh`, {}, { withCredentials: true })
      .pipe(
        map(() => getAccessTokenOrThrow(cookieService)),
        shareReplay(1),
        finalize(() => {
          refreshAccessTokenRequest$ = null;
        }),
      );
  }

  return refreshAccessTokenRequest$;
}

export const BearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const rawHttpClient = new HttpClient(inject(HttpBackend));

  const accessToken = cookieService.get('accessToken');

  const authenticatedRequest =
    accessToken && !shouldSkipRefresh(req.url)
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : req;

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      const canTryRefresh =
        error.status === 401 &&
        !shouldSkipRefresh(authenticatedRequest.url) &&
        !authenticatedRequest.context.get(RETRIED_AFTER_REFRESH);

      if (!canTryRefresh) {
        return throwError(() => error);
      }

      return refreshAccessToken(rawHttpClient, cookieService).pipe(
        switchMap((refreshedAccessToken) => {
          const retriedRequest = authenticatedRequest.clone({
            context: authenticatedRequest.context.set(RETRIED_AFTER_REFRESH, true),
            setHeaders: {
              Authorization: `Bearer ${refreshedAccessToken}`,
            },
          });

          return next(retriedRequest);
        }),
        catchError((refreshError) => {
          cookieService.delete('accessToken');
          router.navigate(['/auth/login']);
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
