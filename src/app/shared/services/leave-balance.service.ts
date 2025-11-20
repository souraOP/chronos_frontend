import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { NewLeaveBalance } from '../../landing-page/models/new-leave-balance.model';
import { CreateLeaveBalanceResponse } from '../../landing-page/models/leave-request-response/create-leave-balance-response.model';
import { LeaveType } from '../../constants/leave-type';

@Injectable({
  providedIn: 'root',
})
export class LeaveBalanceService {
  private http = inject(HttpClient);
  private newLeaveBalanceEndpoint = `${environment.BASE_URL}/api/leave-balances/employees`;

  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) return '';
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('User not logged in!');
      return '';
    }
  }

  createLeaveBalance(employeeId: string, leaveType: string, balance: number): Observable<CreateLeaveBalanceResponse> {
    const url = `${this.newLeaveBalanceEndpoint}/${employeeId}?leaveType=${leaveType}&leaveBalance=${balance}`;
    return this.http.post<CreateLeaveBalanceResponse>(url, {});
  }

  getLeaveBalanceFromBackend(): Observable<NewLeaveBalance[]> {
    const uuid = this.getUuid();
    const url = `${this.newLeaveBalanceEndpoint}/${uuid}`;

    return this.http.get<NewLeaveBalance[]>(url);
  }

  getNewSickLeaveBalance(newLeaveBalance: NewLeaveBalance[]): number {
    const sickLeave = newLeaveBalance.find(
      (balance) => balance.leaveType === LeaveType.SICK
    );
    return sickLeave ? sickLeave.leaveBalance : 0;
  }

  getNewVacationLeaveBalance(leaveBalance: NewLeaveBalance[]): number {
    const vacationLeave = leaveBalance.find(
      (balance) => balance.leaveType === LeaveType.VACATION
    );
    return vacationLeave ? vacationLeave.leaveBalance : 0;
  }

  getNewPersonalLeaveBalance(leaveBalance: NewLeaveBalance[]): number {
    const personalBalance = leaveBalance.find(
      (balance) => balance.leaveType === LeaveType.PERSONAL
    );
    return personalBalance ? personalBalance.leaveBalance : 0;
  }
}
