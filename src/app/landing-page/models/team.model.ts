import { TeamMembers } from './team-members.model';

export class Team {
  constructor(
    public manager_uuid: string,
    public team_name: string,
    public members?: TeamMembers[],
    public id?: string
  ) {}
}
