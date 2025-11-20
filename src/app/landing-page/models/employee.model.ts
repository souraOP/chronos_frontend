import { GENDER } from "../../constants/gender";
import { Role } from "../../constants/role";

export class Employee {
  constructor(
    public uuid: string,
    public displayEmployeeId: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: GENDER,
    public phoneNumber: string,
    public jobTitle: string,
    public isActive: boolean = true,
    public departmentName: string,
    public role: Role = Role.EMPLOYEE
  ) {}
}
