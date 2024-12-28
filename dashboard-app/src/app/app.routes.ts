import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { 
    path: 'users', 
    loadComponent: () => import('./pages/users/users.component')
      .then(m => m.UsersComponent)
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./pages/settings/settings.component')
      .then(m => m.SettingsComponent)
  }
];