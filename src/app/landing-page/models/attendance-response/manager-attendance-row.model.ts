import { AttendanceStatus } from "../../../constants/attendance-status";

export interface ManagerAttendanceRow {
  displayEmployeeId: string;
  employeeName: string;
  checkIn: string | null;
  checkOut: string | null;
  hoursWorked: number;
  attendanceStatus: AttendanceStatus;
}
