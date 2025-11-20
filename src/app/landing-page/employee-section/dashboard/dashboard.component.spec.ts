import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LeaveBalanceService } from '../../../shared/services/leave-balance.service';
import { EmployeeDashboardService } from '../../../shared/services/employee-services/employee-dashboard.service';
import { ShiftService } from '../../../shared/services/employee-services/employee-shift.service';
import { EmployeeLeaveRequestService } from '../../../shared/services/employee-services/employee-leave-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  const leaveBalanceMock = {
    getLeaveBalanceFromBackend: () => of([{ type: 'SICK', balance: 5 }]),
    getNewSickLeaveBalance: () => 5,
    getNewVacationLeaveBalance: () => 10,
    getNewPersonalLeaveBalance: () => 3,
  };

  const employeeDashboardMock = {
    getEmployeeName: () => of({ firstName: 'John', lastName: 'Doe' }),
    getLeaveRequests: () => of([]),
  };

  const shiftServiceMock = {
    getEmployeeUpcomingShiftsDashboard: () => of([]),
  };

  const leaveRequestServiceMock = {
    getLeaveRequests: () => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule],
      providers: [
        { provide: LeaveBalanceService, useValue: leaveBalanceMock },
        { provide: EmployeeDashboardService, useValue: employeeDashboardMock },
        { provide: ShiftService, useValue: shiftServiceMock },
        {
          provide: EmployeeLeaveRequestService,
          useValue: leaveRequestServiceMock,
        },
      ],

      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should create and load data on init', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.employeeName?.firstName).toBe('John');
    expect(component.newLeaveBalance.length).toBe(1);
  });
});
