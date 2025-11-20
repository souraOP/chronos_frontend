import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReportResponse } from '../../models/reports-response/report-response.model';
import { ManagerReportService } from '../../../shared/services/manager-services/manager-report.service';
import { GenerateReportRequest } from '../../models/reports-response/generate-report-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-report-analytics',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manager-report-analytics.component.html',
  styleUrl: './manager-report-analytics.component.css',
})
export class ManagerReportAnalyticsComponent implements OnInit {
  private reportService = inject(ManagerReportService);

  reportResponse?: ReportResponse;
  reportReponseTableView: ReportResponse[] = [];

  generateReportForm!: FormGroup;
  ngOnInit(): void {
    this.generateReportForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    });

    this.fetchReports();
  }

  generateReport(event: Event) {
    event.preventDefault();

    const generateReportPayload: GenerateReportRequest = {
      startDate: this.generateReportForm.value.start_date,
      endDate: this.generateReportForm.value.end_date,
    };

    this.reportService
      .generateReportByManager(generateReportPayload)
      .subscribe({
        next: (res) => {
          this.reportResponse = res;
          alert('Generated Report Successfully!');
        },
        error: (err) => {
          console.error('Error generating report!', err);
          alert('Error occurred while generating report');
        },
      });
  }

  fetchReports() {
    this.reportService.fetchTeamReport().subscribe({
      next: (res) => {
        this.reportReponseTableView = res;
      },
      error: (err) => {
        console.error('Unable to fetch report data! ', err);
      },
    });
  }
}
