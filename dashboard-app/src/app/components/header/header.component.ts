import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="search">
        <input type="text" placeholder="Search...">
      </div>
      <div class="user-info">
        <span class="user-name">Hamdi</span>
        <button class="profile-btn">Profile</button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .search input {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 300px;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .profile-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background: #3498db;
      color: white;
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {}