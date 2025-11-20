import { LeaveStatus } from "../../../constants/leave-status";
import { LeaveType } from "../../../constants/leave-type";

export interface TeamsLeaveRequest {
  requestId: string;
  employeeId: string;
  displayEmployeeId: string;
  employeeFirstName: string;
  employeeLastName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason: string;
}
