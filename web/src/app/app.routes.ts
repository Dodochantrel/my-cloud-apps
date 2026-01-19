import { Routes } from '@angular/router';
import { authRoutes } from './core/auth/auth.routes';
import { featureRoutes } from './features/feature.routes';

export const routes: Routes = [
    ...authRoutes,
    ...featureRoutes
];
