import { Routes } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'home',
                component: MainComponent
            },
        ]
    },
    {
        path: '**',
        component: ErrorPageComponent
    }
];
