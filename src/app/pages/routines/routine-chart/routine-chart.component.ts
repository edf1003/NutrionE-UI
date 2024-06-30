import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-routine-chart',
  templateUrl: './routine-chart.component.html',
  styleUrls: ['./routine-chart.component.scss'],
})
export class RoutineChartComponent implements OnInit {
  @Input() weeklySteps: number[] = [];
  @Input() weeklyCalories: number[] = [];
  data: { name: string; series: { name: string; value: number }[] }[] = [];

  ngOnInit(): void {
    this.data = this.generateChartData();
  }

  generateChartData(): { name: string; series: { name: string; value: number }[] }[] {
    const currentDate = new Date();
    const stepsSeries: { name: string; series: { name: string; value: number }[] } = { name: 'Pasos', series: [] };
    const caloriesSeries: { name: string; series: { name: string; value: number }[] } = {
      name: 'Calorías',
      series: [],
    };

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      const formattedDate = this.formatDate(date);

      if (this.weeklySteps[i] !== undefined && this.weeklyCalories[i] !== undefined) {
        stepsSeries.series.push({
          name: formattedDate.toString(),
          value: this.weeklySteps[i],
        });

        caloriesSeries.series.push({
          name: formattedDate.toString(),
          value: this.weeklyCalories[i],
        });
      }
    }

    // Aseguramos que los datos estén en orden cronológico ascendente
    stepsSeries.series.reverse();
    caloriesSeries.series.reverse();

    return [stepsSeries, caloriesSeries];
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
