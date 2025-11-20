import { TestBed } from '@angular/core/testing';
import { EmployeeAttendanceService } from './employee-attendance.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../environment/environment';

describe('EmployeeAttendanceService', () => {
  let service: EmployeeAttendanceService;
  let httpMock: HttpTestingController;
  const uuid = 'emp-uuid-1';

  beforeEach(() => {
    localStorage.setItem('auth', JSON.stringify({ uuid }));
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeAttendanceService],
    });
    service = TestBed.inject(EmployeeAttendanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('should call history endpoint with uuid', () => {
    service.getHistoryForEmployee().subscribe();
    const expected = `${environment.BASE_URL}/api/attendances/${uuid}/history`;
    const req = httpMock.expectOne(expected);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call check-in endpoint', () => {
    service.checkIn().subscribe();
    const expected = `${environment.BASE_URL}/api/attendances/${uuid}/check-in`;
    const req = httpMock.expectOne(expected);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
