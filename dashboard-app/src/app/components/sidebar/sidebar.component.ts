import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="sidebar">
      <div class="logo">
        <h2>Dashboard</h2>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a></li>
        <li><a routerLink="/users" routerLinkActive="active">Users</a></li>
        <li><a routerLink="/settings" routerLinkActive="active">Settings</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: #2c3e50;
      color: white;
      padding: 20px;
    }
    .logo {
      padding: 20px 0;
      text-align: center;
    }
    .nav-links {
      list-style: none;
      padding: 0;
      margin: 20px 0;
    }
    .nav-links li a {
      color: white;
      text-decoration: none;
      padding: 10px 15px;
      display: block;
      transition: 0.3s;
    }
    .nav-links li a:hover, .nav-links li a.active {
      background: #34495e;
      border-radius: 5px;
    }
  `]
})
export class SidebarComponent {}