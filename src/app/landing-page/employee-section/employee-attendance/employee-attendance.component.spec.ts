import { TestBed } from '@angular/core/testing';
import { EmployeeAttendanceComponent } from './employee-attendance.component';
import { EmployeeAttendanceService } from '../../../shared/services/employee-services/employee-attendance.service';
import { of } from 'rxjs';
import { AttendanceHistoryForEmployee } from '../../models/attendance-response/attendance-history-response.model';
import { AttendanceStatus } from '../../../constants/attendance-status';

class MockAttendanceService {
  history: AttendanceHistoryForEmployee[] = [];
  getHistoryForEmployee() {
    return of(this.history);
  }
  checkIn() {
    return of({});
  }
  checkOut() {
    return of({});
  }
}

describe('EmployeeAttendanceComponent', () => {
  let component: EmployeeAttendanceComponent;
  let service: MockAttendanceService;

  beforeEach(() => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ uuid: 'u-1', employeeId: 'EMP-1' })
    );

    TestBed.configureTestingModule({
      imports: [EmployeeAttendanceComponent],
      providers: [
        { provide: EmployeeAttendanceService, useClass: MockAttendanceService },
      ],
    });

    const fixture = TestBed.createComponent(EmployeeAttendanceComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EmployeeAttendanceService) as any;
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark clocked in when ACTIVE record exists', () => {
    service.history = [
      {
        attendanceId: '1',
        date: '2025-11-03',
        checkIn: '2025-11-03T10:00:00Z',
        checkOut: '',
        hoursWorked: 0,
        attendanceStatus: AttendanceStatus.ACTIVE,
        location: '',
      },
    ];
    (component as any).refreshHistory();
    expect(component.isClockedIn).toBeTrue();
    expect(component.currentStatus).toBe('ACTIVE');
  });

  it('should mark not clocked in when only COMPLETE records exist', () => {
    service.history = [
      {
        attendanceId: '2',
        date: '2025-11-03',
        checkIn: '2025-11-03T08:00:00Z',
        checkOut: '2025-11-03T16:00:00Z',
        hoursWorked: 8,
        attendanceStatus: AttendanceStatus.COMPLETE,
        location: '',
      },
    ];
    (component as any).refreshHistory();
    expect(component.isClockedIn).toBeFalse();
    expect(component.currentStatus).toBe('COMPLETE');
  });
});
