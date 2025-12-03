import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'basic-demos' },
  {
    path: 'basic-demos',
    loadComponent: () => import('./basic-demos/basic-demos').then((m) => m.BasicDemos),
  },
  {
    path: 'advanced-demos',
    loadComponent: () => import('./advanced-demos/advanced-demos').then((m) => m.AdvancedDemos),
  },
  {
    path: 'split-cost',
    loadComponent: () => import('./split-cost/split-cost').then((m) => m.SplitCost),
  },
  {
    path: 'favorite-mfk',
    loadComponent: () =>
      import('./favorite-mfk-demo/favorite-mfk-demo').then((m) => m.FavoriteMfkDemo),
  },
  {
    path: 'mfk-validations',
    loadComponent: () => import('./mfk-validations/mfk-validations').then((m) => m.MfkValidations),
  },
  { path: '**', redirectTo: '' },
];
