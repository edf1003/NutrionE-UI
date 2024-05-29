import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-calories-chart',
  templateUrl: './home-calories-chart.component.html',
  styleUrls: ['./home-calories-chart.component.scss'],
})
export class HomeCaloriesChartComponent implements OnInit {
  @Input() weeklyCalories: number[] = [];
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
      const calories = this.weeklyCalories[i] || 0;

      chartData.push({
        name: formattedDate,
        value: calories,
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
