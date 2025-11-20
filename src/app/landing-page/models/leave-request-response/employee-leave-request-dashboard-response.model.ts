import { LeaveStatus } from "../../../constants/leave-status";
import { LeaveType } from "../../../constants/leave-type";

export interface EmployeeLeaveRequestDashboard {
  leaveRequestId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
}
