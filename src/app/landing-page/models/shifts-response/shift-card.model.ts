import { ShiftStatus } from "../../../constants/shift-status";
import { ShiftType } from "../../../constants/shift-type";

export interface ShiftCard {
  id: string;
  shiftId: string;
  shiftDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  shiftLocation: string;
  shiftType: ShiftType;
  shiftStatus: ShiftStatus;
}
