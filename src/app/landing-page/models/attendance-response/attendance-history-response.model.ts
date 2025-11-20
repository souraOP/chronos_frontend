import { AttendanceStatus } from "../../../constants/attendance-status";

export interface AttendanceHistoryForEmployee {
  attendanceId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  attendanceStatus: AttendanceStatus;
  location: string;
}
