import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDTO, ChangePasswordResponseDTO } from '../../landing-page/models/auth.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private http = inject(HttpClient);

  changePassword(email: string, payload: ChangePasswordDTO): Observable<ChangePasswordResponseDTO> {
    const url = `${environment.BASE_URL}/api/login/change-password?email=${decodeURIComponent(email)}`;
    return this.http.patch<ChangePasswordResponseDTO>(url, payload);
  }
}
