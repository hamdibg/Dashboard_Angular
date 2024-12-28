import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Settings {
  notifications: boolean;
  emailUpdates: boolean;
  darkMode: boolean;
  language: string;
  timezone: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <h2>Settings</h2>
      
      <div class="settings-section">
        <h3>General Settings</h3>
        <div class="setting-item">
          <label class="switch">
            <input type="checkbox" [(ngModel)]="settings.darkMode">
            <span class="slider"></span>
          </label>
          <span class="setting-label">Dark Mode</span>
        </div>
        
        <div class="setting-item">
          <label class="switch">
            <input type="checkbox" [(ngModel)]="settings.notifications">
            <span class="slider"></span>
          </label>
          <span class="setting-label">Enable Notifications</span>
        </div>
        
        <div class="setting-item">
          <label class="switch">
            <input type="checkbox" [(ngModel)]="settings.emailUpdates">
            <span class="slider"></span>
          </label>
          <span class="setting-label">Email Updates</span>
        </div>
      </div>

      <div class="settings-section">
        <h3>Preferences</h3>
        <div class="setting-item">
          <label>Language:</label>
          <select [(ngModel)]="settings.language">
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
          </select>
        </div>

        <div class="setting-item">
          <label>Timezone:</label>
          <select [(ngModel)]="settings.timezone">
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="CST">Central Time</option>
            <option value="PST">Pacific Time</option>
          </select>
        </div>
      </div>

      <div class="settings-actions">
        <button class="cancel-btn" (click)="resetSettings()">Reset</button>
        <button class="save-btn" (click)="saveSettings()">Save Changes</button>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .settings-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    h3 {
      margin-bottom: 20px;
      color: #2c3e50;
    }

    .setting-item {
      display: flex;
      align-items: center;
      margin: 15px 0;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    .setting-label {
      margin-left: 10px;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: #2ecc71;
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }

    select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-left: 10px;
      width: 200px;
    }

    .settings-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .save-btn,
    .cancel-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .save-btn {
      background: #2ecc71;
      color: white;
    }

    .cancel-btn {
      background: #95a5a6;
      color: white;
    }
  `]
})
export class SettingsComponent {
  settings: Settings = {
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC'
  };

  private initialSettings: Settings = { ...this.settings };

  resetSettings() {
    this.settings = { ...this.initialSettings };
  }

  saveSettings() {
    // Here you would typically save to a backend service
    console.log('Settings saved:', this.settings);
    alert('Settings saved successfully!');
    this.initialSettings = { ...this.settings };
  }
}