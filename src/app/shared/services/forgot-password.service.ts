import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private http = inject(HttpClient);

  private forgotPasswordEndpoint = `${environment.BASE_URL}/api/login`;

  isEmailPresent(email: string) {
    const url = `${this.forgotPasswordEndpoint}/${email}`;
    return this.http.get(url);
  }
}
