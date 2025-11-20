import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { Employee } from '../../../landing-page/models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeUserProfileService {
  private http = inject(HttpClient);

  private employeeEndpoint = `${environment.BASE_URL}/api/employees`;

  constructor(private router: Router) {}

  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) return '';
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('Employee not logged in!');
      return '';
    }
  }

  getEmployeeDetails(): Observable<Employee> {
    const uuid = this.getUuid();
    const url = `${this.employeeEndpoint}/${uuid}`;
    return this.http.get<Employee>(url);
  }

  onClickChangePassword() {
    this.router.navigate(['change-password']);
  }
}
