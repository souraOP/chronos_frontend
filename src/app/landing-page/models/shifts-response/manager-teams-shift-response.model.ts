import { ShiftStatus } from "../../../constants/shift-status";
import { ShiftType } from "../../../constants/shift-type";

export interface ManagerTeamsShiftResponse {
  id: string;
  shiftId: string;
  employeeName: string;
  shiftDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  shiftType: ShiftType;
  shiftLocation: string;
  shiftStatus: ShiftStatus;
}
