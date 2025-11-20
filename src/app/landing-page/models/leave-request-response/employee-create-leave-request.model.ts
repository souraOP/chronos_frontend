import { LeaveType } from "../../../constants/leave-type";

export interface CreateNewLeaveRequest {
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}
