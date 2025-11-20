import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Employee } from '../../employee-login-page/employee-login.model';
import { AuthUser } from '../../models/auth.model';

@Component({
  selector: 'app-manager-sidebar',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './manager-sidebar.component.html',
  styleUrl: './manager-sidebar.component.css',
})
export class ManagerSidebarComponent implements OnInit {
  public eachManager = signal<AuthUser | null>(null);

  private authService = inject(AuthService);

  navItems = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'attendance', name: 'Attendance' },
    { id: 'leave-requests', name: 'Leave Requests' },
    { id: 'shift-management', name: 'Shift Management' },
    { id: 'report-analytics', name: 'Reports & Analytics' },
  ];

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    const getUser = localStorage.getItem('auth');
    if (getUser) {
      const getCurrentLoggedInUser = JSON.parse(getUser);
      this.eachManager.set(getCurrentLoggedInUser);
    } else {
      this.eachManager.set(null);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
