import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/warriors/warriors-list/warriors.component')
    },
    {
        path: 'warrior/create',
        loadComponent: () => import('./features/warriors/create-warrior/create-warrior.component')
    },
    {
        path: 'type-warrior',
        loadComponent : () => import('./features/typeWarrior/type-warrior.component')
    },
    {
        path: 'update-basics/:id',
        loadComponent: () => import('./features/warriors/edit-basics/edit-basics.component')
    },
    {
        path: 'update-breed/:id',
        loadComponent: () => import('./features/warriors/edit-breed/edit-breed.component')
    },
    {
        path: 'update-type/:id',
        loadComponent:() => import('./features/warriors/edit-type/edit-type.component')
    }
];
