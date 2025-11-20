import { TestBed } from '@angular/core/testing';
import { EmployeeShiftManagementComponent } from './employee-shift-management.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShiftSwapEmployeeService } from '../../../shared/services/employee-services/shift-swap-employee.service';
import { RequestSwapEmployeeService } from '../../../shared/services/employee-services/request-swap-employee.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmployeeShiftManagementComponent', () => {
  const shiftSwapServiceMock = {
    loadShiftSwapRequests: () => of([]),
    getShiftSwapRequestsForEmployee: () => of([]),
  };

  const requestSwapServiceMock = {
    getUuid: () => 'u-1',
    getLoggedInEmployeeShiftsInForm: () => of([]),
    getTeamMembersWithUpcomingShifts: () => of([]),
    createSwapRequest: () => of({}),
  };

  beforeEach(() => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ uuid: 'u-1', employeeId: 'EMP-1' })
    );

    TestBed.configureTestingModule({
      imports: [
        EmployeeShiftManagementComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ShiftSwapEmployeeService, useValue: shiftSwapServiceMock },
        {
          provide: RequestSwapEmployeeService,
          useValue: requestSwapServiceMock,
        },
      ],
    });
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    const fixture = TestBed.createComponent(EmployeeShiftManagementComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should toggle modal open/close', () => {
    const fixture = TestBed.createComponent(EmployeeShiftManagementComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.openModal();
    expect(component.isModalOpen()).toBeTrue();
    component.closeModal();
    expect(component.isModalOpen()).toBeFalse();
  });
});
