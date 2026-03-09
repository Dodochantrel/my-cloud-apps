import { Routes } from "@angular/router";
import { ApplicationTemplate } from "../shared/templates/application-template/application-template";

export const featureRoutes: Routes = [
    {
        path: '',
        redirectTo: 'videos/list',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ApplicationTemplate,
        children: [
            {
                path: 'videos/list',
                title: 'Vidéos - Liste',
                loadComponent: () => import('./videos/video-list/video-list-page/video-list-page').then(m => m.VideoListPage),
                data: {
                    title: 'Vidéos - Liste',
                    breadcrumb: [{ label: 'Vidéos' }, { label: 'Liste' }],
                },
            },
            {
                path: 'videos/details/:id',
                title: 'Vidéos - Détails',
                loadComponent: () => import('./videos/video-details/video-details-page/video-details-page').then(m => m.VideoDetailsPage),
                data: {
                    title: 'Vidéos - Détails',
                    breadcrumb: [{ label: 'Vidéos' }, { label: 'Détails' }],
                },
            },
        ]
    }
];