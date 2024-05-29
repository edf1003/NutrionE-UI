import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DailyRoutineDTO, ExerciseType, SelectItemDTO } from 'src/models/models-classes';
import { DailyRoutinesService } from 'src/services/daily-routines.service';
import { EnumsService } from 'src/services/enums.service';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.scss'],
})
export class RoutinesComponent implements OnInit {
  @Input() dailyRoutine: DailyRoutineDTO;
  exerciseTypes: SelectItemDTO<ExerciseType>[];
  dataForm = this.formBuilder.group({
    exerciseType: [undefined as ExerciseType, Validators.required],
    email: [undefined as string, Validators.required],
  });

  constructor(
    private dailyRoutinesService: DailyRoutinesService,
    private formBuilder: FormBuilder,
    private enumsService: EnumsService,
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.exerciseTypes = this.enumsService.getExerciseTypesForSelect();
  }

  resetForm() {
    this.dataForm.reset({
      exerciseType: ExerciseType.Back,
    });
  }

  createDailyRoutine() {
    this.dailyRoutinesService.createDailyRoutine(this.dataForm.controls.exerciseType.value).subscribe(dailyRoutine => {
      this.dailyRoutine = dailyRoutine;
    });
  }
}
