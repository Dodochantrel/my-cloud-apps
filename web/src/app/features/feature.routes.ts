import { Routes } from "@angular/router";
import { ApplicationTemplate } from "../shared/templates/application-template/application-template";

export const featureRoutes: Routes = [
    {
        path: '',
        redirectTo: 'videos/list',
        pathMatch: 'full',
    },
    {
        path: 'videos',
        component: ApplicationTemplate,
        children: [
            {
                path: 'list',
                title: 'Vidéos - Liste',
                loadComponent: () => import('./videos/video-list/video-list-page/video-list-page').then(m => m.VideoListPage),
                data: {
                    title: 'Vidéos - Liste',
                    breadcrumb: [{ label: 'Vidéos' }, { label: 'Liste' }],
                },
            },
            {
                path: 'details/:id',
                title: 'Vidéos - Détails',
                loadComponent: () => import('./videos/video-details/video-details-page/video-details-page').then(m => m.VideoDetailsPage),
                data: {
                    title: 'Vidéos - Détails',
                    breadcrumb: [{ label: 'Vidéos' }, { label: 'Détails' }],
                },
            },
        ]
    },
    {
        path: 'events',
        component: ApplicationTemplate,
        children: [
            {
                path: 'list',
                title: 'Événements - Liste',
                loadComponent: () => import('./events/event-lists/event-list-page/event-list-page').then(m => m.EventListPage),
                data: {
                    title: 'Événements - Liste',
                    breadcrumb: [{ label: 'Événements' }, { label: 'Liste' }],
                },
            },
        ]
    },
    {
        path: 'groups',
        component: ApplicationTemplate,
        children: [
            {
                path: 'list',
                title: 'Groupes - Liste',
                loadComponent: () => import('./groups/group-list/group-list-page/group-list-page').then(m => m.GroupListPage),
                data: {
                    title: 'Groupes - Liste',
                    breadcrumb: [{ label: 'Groupes' }, { label: 'Liste' }],
                },
            },
        ]
    }
];