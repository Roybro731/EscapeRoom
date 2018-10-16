import { Routes } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: MainComponent
    // },
    {
        path: '**',
        component: ErrorPageComponent
    }
];
