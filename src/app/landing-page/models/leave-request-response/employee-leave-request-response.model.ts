import { LeaveStatus } from "../../../constants/leave-status";
import { LeaveType } from "../../../constants/leave-type";

export interface LeaveRequestTableForEmployee {
  leaveRequestId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  requestDate: string;
  reason: string;
}
