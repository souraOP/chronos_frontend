import { TestBed } from '@angular/core/testing';
import { AllUpcomingShiftsComponent } from './all-upcoming-shifts.component';
import { of } from 'rxjs';
import { ShiftService } from '../../../../shared/services/employee-services/employee-shift.service';

describe('AllUpcomingShiftsComponent', () => {
  const shiftServiceMock = {
    getEmployeeUpcomingShiftsTable: () => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllUpcomingShiftsComponent],
      providers: [{ provide: ShiftService, useValue: shiftServiceMock }],
    });
  });

  it('should create and load shifts', () => {
    const fixture = TestBed.createComponent(AllUpcomingShiftsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.getShifts).toEqual([]);
  });
});
