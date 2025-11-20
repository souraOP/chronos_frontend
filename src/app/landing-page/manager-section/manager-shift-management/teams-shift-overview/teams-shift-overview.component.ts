import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ManagerTeamsShiftResponse } from '../../../models/shifts-response/manager-teams-shift-response.model';
import { ManagerShiftService } from '../../../../shared/services/manager-services/manager-shift.service';

@Component({
  selector: 'app-teams-shift-overview',
  imports: [CommonModule],
  templateUrl: './teams-shift-overview.component.html',
  styleUrl: './teams-shift-overview.component.css',
})
export class TeamsShiftOverviewComponent implements OnInit {
  @Input({ required: true }) getShiftDate: string = '';

  private managerShiftService = inject(ManagerShiftService);
  public getShiftsByDate: ManagerTeamsShiftResponse[] = [];

  ngOnInit(): void {
    this.onChangeDateGetShifts();
  }

  // new
  onChangeDateGetShifts() {
    this.managerShiftService
      .getTeamsShiftByManagerWithDatePicker(this.getShiftDate)
      .subscribe({
        next: (shifts) => {
          this.getShiftsByDate = shifts;
          console.log(this.getShiftDate);
        },
        error: (err) => {
          console.error('Error occurred while fetching the shifts ', err);
          this.getShiftsByDate = [];
        },
      });
  }
}
