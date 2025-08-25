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
    path: 'prabhupada-on-chanting',
    loadComponent: () => import('./prabhupada-on-chanting/prabhupada-on-chanting.page').then( m => m.PrabhupadaOnChantingPage)
  },
  {
    path: 'how-to-chant',
    loadComponent: () => import('./how-to-chant/how-to-chant.page').then( m => m.HowToChantPage)
  },
  {
    path: 'benefits-of-chanting',
    loadComponent: () => import('./benefits-of-chanting/benefits-of-chanting.page').then( m => m.BenefitsOfChantingPage)
  },
  {
    path: 'setting',
    loadComponent: () => import('./setting/setting.page').then( m => m.SettingPage)
  },
];
