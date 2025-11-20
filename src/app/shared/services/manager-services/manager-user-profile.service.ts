import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../../../landing-page/models/employee.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagerUserProfileService {
  private http = inject(HttpClient);

  private managerEndpoint = `${environment.BASE_URL}/api/employees`;

  constructor(private router: Router) {}

  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) return '';
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('Manager not logged in!');
      return '';
    }
  }

  getManagerDetails(): Observable<Employee> {
    const uuid = this.getUuid();
    const url = `${this.managerEndpoint}/${uuid}`;
    return this.http.get<Employee>(url);
  }

  onClickChangePassword() {
    this.router.navigate(['change-password']);
  }
}
