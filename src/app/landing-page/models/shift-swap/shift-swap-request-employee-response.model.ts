import { ShiftSwapStatus } from "../../../constants/shift-swap-status";
import { ShiftType } from "../../../constants/shift-type";

export interface ShiftSwapRequestForEmployee {
  id: string;
  shiftSwapId: string;
  fromEmployeeName: string;
  toEmployeeName: string;
  status: ShiftSwapStatus;
  // offeringShift
  offeringShiftType: ShiftType;
  offeringShiftDate: string;
  offeringShiftStartTime: string;
  offeringShiftEndTime: string;
  offeringShiftLocation: string;
  // requestingShift
  requestingShiftType: ShiftType;
  requestingShiftDate: string;
  requestingShiftStartTime: string;
  requestingShiftEndTime: string;
  requestingShiftLocation: string;
  reason: string;
  approvedByName: string;
  approvedDate: string;
}
