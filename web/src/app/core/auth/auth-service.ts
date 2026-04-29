import { effect, Injectable, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRoutes } from '../api/auths/auth-routes';
import { NotificationService } from '../notification/notification-service';
import { CookieService } from '../cookie/cookie.service';
import { GetMeResponseDto, mapFromGetMeResponseDtoToUserModel } from '../api/auths/dtos/get-me-dto';
import { HttpErrorResponse, httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly authRoutes: AuthRoutes = new AuthRoutes();

  login(email: string, password: string, rememberMe: boolean) {
    return this.authRoutes.login(email, password, rememberMe).subscribe({
      next: (response) => {
        this.notificationService.success('Connexion réussie', `Vous êtes maintenant connecté.`);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.notificationService.error(
          'Erreur de connexion',
          err.error?.message ||
            'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.',
        );
      },
    });
  }

  register(email: string, firstName: string, lastName: string, password: string) {
    return this.authRoutes.register(email, firstName, lastName, password).subscribe({
      next: () => {
        this.notificationService.success(
          'Inscription réussie',
          'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.',
        );
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.notificationService.error(
          "Erreur lors de l'inscription",
          err.error?.message ||
            'Une erreur est survenue lors de la création de votre compte. Veuillez réessayer plus tard.',
        );
      },
    });
  }

  refreshAccessToken() {
    return this.authRoutes.refreshAccessToken();
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('accessToken');
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
    this.cookieService.delete('user');
    this.notificationService.info('Déconexion', 'Vous avez été déconnecté avec succès.');
    this.router.navigate(['/auth/login']);
  }

  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
  ) {
    effect(() => {
      const error = this.groupsResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement des groupes',
          (error as HttpErrorResponse).message || 'Erreur inconnue',
        );
      }
    });
  }

  private readonly groupsResource = httpResource<GetMeResponseDto>(() => this.authRoutes.getMe());
  public connectedUser = linkedSignal(() => {
    const groupsData = this.groupsResource.error() ? null : this.groupsResource.value();
    if (!groupsData) return null;

    return mapFromGetMeResponseDtoToUserModel(groupsData);
  });
  public isLoadingGroups = this.groupsResource.isLoading;
}
