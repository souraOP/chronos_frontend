export type LoginMessageStatus = 'success' | 'failed' | null;

export interface Employee {
  uuid: string;
  employeeId: string;
  email: string;
  managerEmail?: string;
  password?: string;
  role?: 'Employee' | 'Manager';
}
