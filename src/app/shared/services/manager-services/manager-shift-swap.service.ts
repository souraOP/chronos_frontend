import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { ShiftSwapRequestForEmployee } from '../../../landing-page/models/shift-swap/shift-swap-request-employee-response.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManagerShiftSwapRequestService {
  private http = inject(HttpClient);

  private shiftSwapRequestEndpoint = `${environment.BASE_URL}/api/shift-swap-requests`;

  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) {
      console.error('Unauthorized!');
      return '';
    }
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('Employee not logged in!');
      return '';
    }
  }

  getShiftSwapRequestByManager(): Observable<ShiftSwapRequestForEmployee[]> {
    const uuid = this.getUuid();

    const url = `${this.shiftSwapRequestEndpoint}/manager/${uuid}/requests`;

    return this.http.get<ShiftSwapRequestForEmployee[]>(url);
  }

  public approveSwapRequest(swapRequestId: string) {
    const uuid = this.getUuid();
    const url = `${this.shiftSwapRequestEndpoint}/manager/${uuid}/requests/${swapRequestId}/approve`;
    return this.http.post<ShiftSwapRequestForEmployee>(url, {});
  }

  public rejectSwapRequest(swapRequestId: string) {
    const uuid = this.getUuid();
    const url = `${this.shiftSwapRequestEndpoint}/manager/${uuid}/requests/${swapRequestId}/reject`;
    return this.http.post<ShiftSwapRequestForEmployee>(url, {});
  }
}
