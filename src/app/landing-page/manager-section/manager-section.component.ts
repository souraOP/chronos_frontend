import { Component } from '@angular/core';
import { ManagerSidebarComponent } from './manager-sidebar/manager-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager-section',
  imports: [ManagerSidebarComponent, RouterOutlet],
  templateUrl: './manager-section.component.html',
  styleUrl: './manager-section.component.css',
})
export class ManagerSectionComponent {}
