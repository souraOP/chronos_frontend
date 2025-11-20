export class TeamMembers {
  constructor(
    public uuid: string,
    public employeeID: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public jobTitle: string,
    public id?: string
  ) {}
}
