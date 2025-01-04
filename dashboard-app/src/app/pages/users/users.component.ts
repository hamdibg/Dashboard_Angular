import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  
import { DashboardService } from '../../services/dashboard.service';
import { User } from '../../models/dashboard.model';

/**
 * UsersComponent handles user management operations
 * 
 * @class UsersComponent
 * @description Manages user CRUD operations including:
 *              - User listing with filtering and sorting
 *              - User creation and editing
 *              - Role management
 *              - Modal handling for user operations
 * 
 * @methods
 * - saveUser: Handles user creation/update
 * - closeModal: Resets modal state and form
 * - filterUsers: Applies filters to user list
 * - sortUsers: Handles user list sorting
 * 
 * @example
 * <app-users></app-users>
 */

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-container">
      <div class="users-header">
        <h2>User Management</h2>
        <button class="btn add-user-btn" (click)="openAddUserModal()">
          <i class="fas fa-plus"></i> Add User
        </button>
      </div>

      <div class="search-wrapper">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          (input)="filterUsers()"
          placeholder="Search users..."
          class="search-input"
        >
        <i class="fas fa-search search-icon"></i>
      </div>

      <div class="table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of filteredUsers">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td>{{user.role}}</td>
              <td class="actions">
                <button class="btn btn-edit" (click)="editUser(user)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-delete" (click)="deleteUser(user.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal" *ngIf="showModal">
        <div class="modal-content">
          <h3>{{editingUser ? 'Edit User' : 'Add New User'}}</h3>
          <form (submit)="saveUser($event)">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" [(ngModel)]="currentUser.name" name="name" required>
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" [(ngModel)]="currentUser.email" name="email" required>
            </div>
            <div class="form-group">
              <label>Role:</label>
              <select [(ngModel)]="currentUser.role" name="role">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-cancel" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn btn-save">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 24px;
      background: #f8f9fa;
      min-height: 100%;
    }

    .users-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .search-wrapper {
      position: relative;
      margin-bottom: 24px;
    }

    .search-input {
      width: 100%;
      max-width: 300px;
      padding: 8px 32px 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow-x: auto;
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
    }

    .users-table th,
    .users-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .users-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    .users-table tr:hover {
      background: #f5f6fa;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .add-user-btn {
      background: #2ecc71;
      color: white;
    }

    .btn-edit {
      background: #3498db;
      color: white;
      padding: 6px 10px;
    }

    .btn-delete {
      background: #e74c3c;
      color: white;
      padding: 6px 10px;
    }

    .btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 24px;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    .btn-cancel {
      background: #95a5a6;
      color: white;
    }

    .btn-save {
      background: #2ecc71;
      color: white;
    }

    @media (max-width: 768px) {
      .users-container {
        padding: 16px;
      }

      .users-header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .search-input {
        max-width: 100%;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  editingUser: boolean = false;
  currentUser: User = { id: 0, name: '', email: '', role: 'User' };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddUserModal() {
    this.editingUser = false;
    this.currentUser = { id: 0, name: '', email: '', role: 'User' };
    this.showModal = true;
  }

  editUser(user: User) {
    this.editingUser = true;
    this.currentUser = { ...user };
    this.showModal = true;
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.id !== id);
      this.filterUsers();
    }
  }

  saveUser(event: Event) {
    event.preventDefault();
    if (this.editingUser) {
      const index = this.users.findIndex(u => u.id === this.currentUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.currentUser };
      }
    } else {
      const newId = Math.max(...this.users.map(u => u.id)) + 1;
      this.users.push({ ...this.currentUser, id: newId });
    }
    this.filterUsers();
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.currentUser = { id: 0, name: '', email: '', role: 'User' };
  }
}