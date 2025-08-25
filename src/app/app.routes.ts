import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component')
    },
    {
        path: 'auth',
        loadComponent: () => import('./features/auth/auth.component')
    },
    {
        path: 'warriors',
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
    },
    {
        path:'update-powers/:id',
        loadComponent: () => import('./features/warriors/edit-powers/edit-powers.component')
    },
    {
        path:'match',
        loadComponent: () => import('./features/match/match.component')
    },
    {
        path:'create-player',
        loadComponent: () => import('./features/create-player/create-player.component')
    },
    {
        path:'into-battle/:matchId',
        loadComponent: () => import('./features/into-battle/into-battle.component')
    },
    {
        path:'players',
        loadComponent: () => import('./features/players/players.component')
    },
    {
        path:'ranking',
        loadComponent: () => import('./features/ranking/ranking.component')
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
