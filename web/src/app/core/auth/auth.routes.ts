import { Routes } from "@angular/router";
import { AuthTemplate } from "../../shared/templates/auth-template/auth-template";

export const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthTemplate,
        children: [
            {
                path: 'login',
                title: 'Connexion',
                loadComponent: () => import('./login/login-page/login-page').then(m => m.LoginPage),
            },
            {
                path: 'register',
                title: 'Inscription',
                loadComponent: () => import('./register/register-page/register-page').then(m => m.RegisterPage),
            },
        ]
    }
];