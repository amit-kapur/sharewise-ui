import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('../../src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../../src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../src/app/dashboard/dashboard.routes').then(
        (m) => m.dashboardRoutes
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../../src/app/settings/settings.route').then(
        (m) => m.settingsRoutes
      ),
  },
  {
    path: 'profiles/:slug',
    loadChildren: () =>
      import('../../src/app/userProfile/userProfile.routes').then(
        (m) => m.userProfileRoute
      ),
  },
  {
    path: 'holdings',
    loadChildren: () =>
      import('./holdings/holdings.routes').then((m) => m.holdingsRoute),
  },
  {
    path: '',
    loadChildren: () =>
      import('../../src/app/home/home.routes').then((m) => m.homeRoutes),
  },
];
