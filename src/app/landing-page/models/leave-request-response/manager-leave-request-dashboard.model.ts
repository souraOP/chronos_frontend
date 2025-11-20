import { LeaveType } from "../../../constants/leave-type";

export interface ManagerLeaveRequestDashboard {
  leaveRequestId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
}
