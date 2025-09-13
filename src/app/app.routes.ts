import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chant',
    pathMatch: 'full',
  },
  {
    path: 'chant',
    loadComponent: () => import('./chant/chant.page').then((m) => m.ChantPage),
  },
  {
    path: 'how-to-chant',
    loadComponent: () => import('./how-to-chant/how-to-chant.page').then( m => m.HowToChantPage)
  },
  {
    path: 'setting',
    loadComponent: () => import('./setting/setting.page').then( m => m.SettingPage)
  },
  {
    path: 'article',
    loadComponent: () => import('./article/article.page').then( m => m.ArticlePage)
  },
  {
    path: 'progress-tracker',
    loadComponent: () => import('./progress-tracker/progress-tracker.page').then( m => m.ProgressTrackerPage)
  },
];
