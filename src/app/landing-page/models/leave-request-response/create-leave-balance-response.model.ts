import { LeaveType } from "../../../constants/leave-type";

export interface CreateLeaveBalanceResponse {
    id: string;
    balanceId: string,
    leaveType: LeaveType;
    leaveBalance: number;
}