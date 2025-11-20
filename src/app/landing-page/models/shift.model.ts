import { ShiftStatus } from '../../constants/shift-status';
import { ShiftType } from '../../constants/shift-type';
import { Employee } from './employee.model';

export class Shift {
  constructor(
    public uuid: string,
    public employee_id: string,
    public shift_id: string,
    public shift_date: string,
    public shift_start_time: string,
    public shift_end_time: string,
    public shift_type: ShiftType,
    public shift_status: ShiftStatus,
    public shift_location?: string,
    public id?: string,
    public employee?: Employee
  ) {}
}
