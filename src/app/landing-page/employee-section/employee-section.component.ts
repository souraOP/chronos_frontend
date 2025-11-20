import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-section',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './employee-section.component.html',
  styleUrl: './employee-section.component.css',
})
export class EmployeeSectionComponent {}
