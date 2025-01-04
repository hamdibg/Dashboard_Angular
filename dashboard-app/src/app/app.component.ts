import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="app-container">
      <app-sidebar />
      <main class="main-content">
        <app-header />
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
    }
    .main-content {
      flex: 1;
      overflow-y: auto;
      background: #f5f6fa;
    }
  `]
})
export class AppComponent {}