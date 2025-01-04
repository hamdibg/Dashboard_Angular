import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * HeaderComponent represents the top navigation bar of the application
 * 
 * @class HeaderComponent
 * @description Handles the rendering and functionality of the application header
 *              including navigation, user profile, and notifications
 * @example
 * <app-header></app-header>
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}
