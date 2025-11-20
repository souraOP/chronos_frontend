import { TestBed } from '@angular/core/testing';
import { EmployeeLeaveRequestsComponent } from './employee-leave-requests.component';
import { of } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeLeaveRequestService } from '../../../shared/services/employee-services/employee-leave-request.service';

describe('EmployeeLeaveRequestsComponent', () => {
  const svcMock = {
    // Adjust names to match your service if different
    createNewLeaveRequest: jasmine
      .createSpy('createNewLeaveRequest')
      .and.returnValue(of(void 0)),
    getLeaveRequests: jasmine
      .createSpy('getLeaveRequests')
      .and.returnValue(of([])),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeLeaveRequestsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: EmployeeLeaveRequestService,
          useValue: svcMock,
        },
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EmployeeLeaveRequestsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
