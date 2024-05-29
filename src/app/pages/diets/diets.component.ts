import { Component, Input } from '@angular/core';
import { DailyDietDTO } from 'src/models/models-classes';
import { DailyDietsService } from 'src/services/daily-diets.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.scss'],
})
export class DietsComponent {
  @Input() dailyDiet: DailyDietDTO;

  constructor(private dailyDietsService: DailyDietsService) {}

  createDailyDiet() {
    this.dailyDietsService.createDailyDiet().subscribe(dailyDiet => {
      this.dailyDiet = dailyDiet;
    });
  }
}
