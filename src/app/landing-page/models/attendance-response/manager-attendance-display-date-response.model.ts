import { ManagerAttendanceRow } from './manager-attendance-row.model';

export interface ManagerAttendanceDisplayByDateResponseDTO {
  date: string;
  attendanceRows: ManagerAttendanceRow[];
}
