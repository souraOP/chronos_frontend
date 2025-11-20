import { TestBed } from '@angular/core/testing';
import { EmployeeUserProfileComponent } from './employee-user-profile.component';
import { of } from 'rxjs';
import { EmployeeUserProfileService } from '../../../shared/services/employee-services/employee-user-profile.service';
import { LeaveBalanceService } from '../../../shared/services/leave-balance.service';

describe('EmployeeUserProfileComponent', () => {
  const profileSvcMock = {
    getEmployeeDetails: () =>
      of({ firstName: 'Jane', lastName: 'Doe', displayEmployeeId: 'EMP-1' }),
    onClickChangePassword: jasmine.createSpy('onClickChangePassword'),
  };
  const leaveSvcMock = {
    getLeaveBalanceFromBackend: () => of([{ type: 'SICK', balance: 4 }]),
    getNewSickLeaveBalance: () => 4,
    getNewVacationLeaveBalance: () => 8,
    getNewPersonalLeaveBalance: () => 2,
  };

  beforeEach(() => {
    localStorage.setItem('auth', JSON.stringify({ uuid: 'u-1' }));

    TestBed.configureTestingModule({
      imports: [EmployeeUserProfileComponent],
      providers: [
        { provide: EmployeeUserProfileService, useValue: profileSvcMock },
        { provide: LeaveBalanceService, useValue: leaveSvcMock },
      ],
    });
  });

  afterEach(() => localStorage.clear());

  it('should create and load profile/leave balance', () => {
    const fixture = TestBed.createComponent(EmployeeUserProfileComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.employee?.firstName).toBe('Jane');
    expect(component.leaveBalance.length).toBe(1);
  });

  it('should delegate to change password navigation', () => {
    const fixture = TestBed.createComponent(EmployeeUserProfileComponent);
    const component = fixture.componentInstance;
    component.onClickChangePassword();
    expect(profileSvcMock.onClickChangePassword).toHaveBeenCalled();
  });
});
