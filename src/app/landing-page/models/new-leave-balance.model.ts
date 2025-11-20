import { LeaveType } from "../../constants/leave-type";

export class NewLeaveBalance {
  constructor(
    public balanceId: string,
    public leaveType: LeaveType,
    public leaveBalance: number
  ) {}
}
