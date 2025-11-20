import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShiftSwapRequestForEmployee } from '../../../landing-page/models/shift-swap/shift-swap-request-employee-response.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ShiftSwapEmployeeService {
  private http = inject(HttpClient);

  private shiftSwapEndpoint = `${environment.BASE_URL}/api/shift-swap-requests`;

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

  loadShiftSwapRequests(): Observable<ShiftSwapRequestForEmployee[]> {
    const uuid = this.getUuid();
    if (!uuid) {
      return of([]);
    }

    const url = `${this.shiftSwapEndpoint}/employee/${uuid}`;
    return this.http.get<ShiftSwapRequestForEmployee[]>(url);
  }
}
