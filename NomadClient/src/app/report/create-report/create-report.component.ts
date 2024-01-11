import { Component } from '@angular/core';
import {AccommodationReport} from "../model/accommodation-report.model";
import {ReportModel} from "../model/report.model";
import {ReportsService} from "../reportts.service";
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent {
  title = 'angular-chart';
  fromDate:Date|null;
  toDate:Date|null;
  accommodationId: number = -1;
  year: number = 2024;
  reportType: string = "";
  accommodations:AccommodationReport[] = [];
  reports:ReportModel[] = [];
  private chart: Chart | undefined;

  constructor(private reportAService:ReportsService) {
    Chart.register(...registerables);
    this.fromDate = null;
    this.toDate = null;
    this.reportAService.getAccommodationsHost().subscribe({
      next: (data: AccommodationReport[]) => {
        this.accommodations = data;
      },
    });
  }
  showDateRangeReport():void{
    if(this.chart!=undefined)
    this.chart.destroy();

    const accommodationNames:number[] = [];
    this.reports.forEach((report: ReportModel) => {
      accommodationNames.push(report.accommodation_id);
    });
    const profits:number[] = [];
    this.reports.forEach((report: ReportModel) => {
      profits.push(report.profit);
    });
    const reservations:number[] = [];
    this.reports.forEach((report: ReportModel) => {
      reservations.push(report.reservationNumber);
    });
    // Bar chart
    const barCanvasEle: any = document.getElementById('line_chart')
    this.chart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: accommodationNames,
        datasets: [{
          label: 'Profit',
          data: profits,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)'
          ],
          borderWidth: 1
        },
          {
            label: 'Reservations',
            data: reservations,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgb(255, 159, 64)'
            ],
            borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
  showMonthsReport():void{
    if(this.chart!=undefined)
      this.chart.destroy();
    const lineCanvasEle: any = document.getElementById('line_chart');
    const profits:number[] = [];
    this.reports.forEach((report: ReportModel) => {
      profits.push(report.profit);
    });
    const reservations:number[] = [];
    this.reports.forEach((report: ReportModel) => {
      reservations.push(report.reservationNumber);
    });
    this.chart = new Chart(lineCanvasEle.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Avgust','September','October','November','December'],
        datasets: [
          { data: profits, label: 'Profits', borderColor: 'rgba(54, 162, 235)' },
          { data: reservations, label: 'Reservations', borderColor: 'rgb(75, 192, 192)' },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  submitForDateRange():void{
    this.reportAService.getDateRangeReport(this.fromDate!, this.toDate!).subscribe({
      next: (data: ReportModel[]) => {
        this.reports = data;
        this.showDateRangeReport();
      },
    });
  }
  submitForOne():void{
    this.reportAService.getMonthlyReport(this.accommodationId, this.year).subscribe({
      next: (data: ReportModel[]) => {
        this.reports = data;
        this.showMonthsReport();
      },
    });
  }
  ngOnInit(){

  }
}
