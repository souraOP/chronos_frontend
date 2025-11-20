import { Role } from "../../constants/role";

export type LoginMessageStatus = 'success' | 'failed' | null;

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  uuid: string;
  email: string;
  role: Role;
  message: string;
  employeeId?: string;
  token: string;
}

export interface AuthUser {
  uuid: string;
  email: string;
  role: Role;
  employeeId?: string;
  token: string;
}

export interface ChangePasswordDTO {
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponseDTO {
  email: string;
  message: string;
}
