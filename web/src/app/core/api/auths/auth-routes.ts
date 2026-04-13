import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

export class AuthRoutes {
  private readonly httpClient = inject(HttpClient);

  login(email: string, password: string, rememberMe: boolean) {
    return this.httpClient.post(
      `${environment.apiUrl}authentications/login`,
      { email, password, rememberMe },
      { withCredentials: true }
    );
  }

  register(email: string, firstName: string, lastName: string, password: string) {
    return this.httpClient.post(`${environment.apiUrl}authentications/register`, {
      email,
      firstName,
      lastName,
      password,
    });
  }

  refreshAccessToken() {
    return this.httpClient.post(
      `${environment.apiUrl}authentications/refresh`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  getMe(): string {
    return `${environment.apiUrl}authentications/me`;
  }
}
