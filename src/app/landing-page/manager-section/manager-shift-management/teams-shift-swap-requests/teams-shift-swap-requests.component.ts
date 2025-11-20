import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftSwapRequestForEmployee } from '../../../models/shift-swap/shift-swap-request-employee-response.model';
import { ManagerShiftSwapRequestService } from '../../../../shared/services/manager-services/manager-shift-swap.service';

@Component({
  selector: 'app-teams-shift-swap-requests',
  imports: [CommonModule],
  templateUrl: './teams-shift-swap-requests.component.html',
  styleUrl: './teams-shift-swap-requests.component.css',
})
export class TeamsShiftSwapRequestsComponent implements OnInit {
  private managerShiftSwapService = inject(ManagerShiftSwapRequestService);

  public shiftSwapRequestList: ShiftSwapRequestForEmployee[] = [];

  public processingIds: Set<string> = new Set();

  ngOnInit(): void {
    this.loadShiftSwapRequests();
  }

  isProcessing(id: string) {
    return this.processingIds.has(id);
  }

  loadShiftSwapRequests() {
    this.managerShiftSwapService.getShiftSwapRequestByManager().subscribe({
      next: (shiftSwaps) => {
        this.shiftSwapRequestList = shiftSwaps;
      },
      error: (err) => {
        console.error('Error fetching shift swap requests ', err);
        this.shiftSwapRequestList = [];
      },
    });
  }

  onApprove(swapRequestId: string) {
    if (!swapRequestId) {
      return;
    }
    if (this.isProcessing(swapRequestId)) {
      return;
    }
    this.processingIds.add(swapRequestId);

    this.managerShiftSwapService.approveSwapRequest(swapRequestId).subscribe({
      next: (updated) => {
        const idx = this.shiftSwapRequestList.findIndex(
          (r) => r.id === swapRequestId
        );
        if (idx > -1) {
          this.shiftSwapRequestList[idx] = updated;
        }
        this.processingIds.delete(swapRequestId);
      },
      error: (err) => {
        console.error('Error while approving swap request id ', err);
        this.processingIds.delete(swapRequestId);
        alert('Failed to approve request!!!');
      },
    });
  }

  onReject(swapRequestId: any) {
    if (!swapRequestId) {
      return;
    }
    if (this.isProcessing(swapRequestId)) {
      return;
    }
    this.processingIds.add(swapRequestId);

    this.managerShiftSwapService.rejectSwapRequest(swapRequestId).subscribe({
      next: (updated) => {
        const idx = this.shiftSwapRequestList.findIndex(
          (r) => r.id === swapRequestId
        );
        if (idx > -1) this.shiftSwapRequestList[idx] = updated;
        this.processingIds.delete(swapRequestId);
      },
      error: (err) => {
        console.error('Error while rejecting swap request id ', err);
        this.processingIds.delete(swapRequestId);
        alert('Failed to reject request!!!');
      },
    });
  }
}
