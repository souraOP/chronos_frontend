import { TestBed } from '@angular/core/testing';
import { RecentLeaveRequestsSectionComponent } from './recent-leave-requests-section.component';
import { EmployeeDashboardService } from '../../../../shared/services/employee-services/employee-dashboard.service';
import { of } from 'rxjs';

describe('RecentLeaveRequestsSectionComponent', () => {
  const svcMock = {
    getLeaveRequests: () => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecentLeaveRequestsSectionComponent],
      providers: [{ provide: EmployeeDashboardService, useValue: svcMock }],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(
      RecentLeaveRequestsSectionComponent
    );
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
