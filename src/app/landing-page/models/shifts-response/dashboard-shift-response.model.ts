import { ShiftStatus } from "../../../constants/shift-status";
import { ShiftType } from "../../../constants/shift-type";

export interface ShiftDashboardResponse {
  id: string;
  shiftId: string;
  shiftDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  shiftStatus: ShiftStatus;
  shiftType: ShiftType;
  shiftLocation: string;
}
