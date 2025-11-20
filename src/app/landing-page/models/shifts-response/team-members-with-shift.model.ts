import { ShiftCard } from './shift-card.model';

export interface TeamMembersWithShift {
  id: string;
  firstName: string;
  lastName: string;
  shifts: ShiftCard[];
}
