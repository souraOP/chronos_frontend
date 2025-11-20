import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { GenerateReportRequest } from '../../../landing-page/models/reports-response/generate-report-request.model';
import { Observable } from 'rxjs';
import { ReportResponse } from '../../../landing-page/models/reports-response/report-response.model';

@Injectable({ providedIn: 'root' })
export class ManagerReportService {
  private http = inject(HttpClient);

  private reportsEndpoint = `${environment.BASE_URL}/api/reports`;

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

  generateReportByManager(
    payload: GenerateReportRequest
  ): Observable<ReportResponse> {
    const managerId = this.getUuid();

    const url = `${this.reportsEndpoint}/manager/${managerId}/generate`;

    return this.http.post<ReportResponse>(url, payload);
  }

  fetchTeamReport(): Observable<ReportResponse[]> {
    const managerId = this.getUuid();

    const url = `${this.reportsEndpoint}/manager/${managerId}/recent`;

    return this.http.get<ReportResponse[]>(url);
  }
}
