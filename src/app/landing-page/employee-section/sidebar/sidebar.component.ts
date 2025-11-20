import { Component, inject, OnInit, signal } from '@angular/core';
import { Employee } from '../../employee-login-page/employee-login.model';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  public eachEmployee = signal<Employee | null>(null);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const loggedInUserLocalStorage = localStorage.getItem('auth');
    if (loggedInUserLocalStorage) {
      const getEmployeeCredentials = JSON.parse(loggedInUserLocalStorage);
      this.eachEmployee.set(getEmployeeCredentials);
    } else {
      this.eachEmployee.set(null);
    }
  }

  navItems = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'attendance', name: 'Attendance' },
    { id: 'leave-requests', name: 'Leave Requests' },
    { id: 'shifts', name: 'Shift Management' },
  ];

  onLogout() {
    this.authService.logout();
  }
}
