export interface ReportResponse {
    id: string;
    reportId: string;
    teamId: string,
    startDate: string;
    endDate: string;
    totalDaysPresent: number;
    totalDaysAbsent: number;
    totalHoursWorked: number;
    generatedAt: string;
}