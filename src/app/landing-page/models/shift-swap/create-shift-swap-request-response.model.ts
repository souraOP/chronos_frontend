export interface CreateShiftSwapRequestPayload {
  requesterEmployeeId: string;
  requestedEmployeeId: string;
  offeringShiftId: string;
  requestingShiftId: string;
  reason: string;
}
