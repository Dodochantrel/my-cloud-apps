import { Routes } from "@angular/router";
import { ApplicationTemplate } from "../shared/templates/application-template/application-template";

export const featureRoutes: Routes = [
    {
        path: '',
        redirectTo: 'movies/list',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ApplicationTemplate,
        children: [
            {
                path: 'movies/list',
                title: 'Films - Liste',
                loadComponent: () => import('./videos/movie-list/movie-list-page/movie-list-page').then(m => m.MovieListPage),
                data: {
                    title: 'Films - Liste',
                    breadcrumb: [{ label: 'Films' }, { label: 'Liste' }],
                },
            },
            {
                path: 'series/list',
                title: 'Séries - Liste',
                loadComponent: () => import('./videos/serie-list/serie-list-page/serie-list-page').then(m => m.SerieListPage),
                data: {
                    title: 'Séries - Liste',
                    breadcrumb: [{ label: 'Séries' }, { label: 'Liste' }],
                },
            },
            {
                path: 'movies/details/:id',
                title: 'Films - Détails',
                loadComponent: () => import('./videos/movie-details/movie-details-page/movie-details-page').then(m => m.MovieDetailsPage),
                data: {
                    title: 'Films - Détails',
                    breadcrumb: [{ label: 'Films' }, { label: 'Détails' }],
                },
            },
            {
                path: 'series/details/:id',
                title: 'Séries - Détails',
                loadComponent: () => import('./videos/serie-details/serie-details-page/serie-details-page').then(m => m.SerieDetailsPage),
                data: {
                    title: 'Séries - Détails',
                    breadcrumb: [{ label: 'Séries' }, { label: 'Détails' }],
                },
            },
        ]
    }
];