import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Add this import
import { DashboardService } from '../../services/dashboard.service';
import { User } from '../../models/dashboard.model';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="users-container">
      <div class="users-header">
        <h2>User Management</h2>
        <button class="add-user-btn" (click)="openAddUserModal()">Add User</button>
      </div>
      <div class="search-bar">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          (input)="filterUsers()"
          placeholder="Search users..."
          class="search-input"
        >
      </div>
      <div class="users-table">
        <table>
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
            <!-- User rows implementation -->
          </tbody>
        </table>
      </div>
      <!-- Modal implementation -->
    </div>
  `,
  styles: [`
    /* Styles */
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