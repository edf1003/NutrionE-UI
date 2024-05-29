import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-steps-chart',
  templateUrl: './home-steps-chart.component.html',
  styleUrls: ['./home-steps-chart.component.scss'],
})
export class HomeStepsChartComponent implements OnInit {
  @Input() weeklySteps: number[] = [];
  data: { name: string; value: number }[] = [];

  ngOnInit(): void {
    this.data = this.generateChartData();
  }

  generateChartData(): { name: string; value: number }[] {
    const currentDate = new Date();
    const chartData: { name: string; value: number }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      const formattedDate = this.formatDate(date);
      const steps = this.weeklySteps[i] || 0;

      chartData.push({
        name: formattedDate,
        value: steps,
      });
    }

    return chartData.reverse();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
