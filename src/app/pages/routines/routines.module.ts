import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomComponentsModule } from 'src/components/custom-components.module';
import { MdbModule } from 'src/components/mdb/mdb.module';
import { RoutinesComponent } from './routines.component';
import { DailyRoutinesResolver } from 'src/models/resolvers/daily-routine.resolver';
import { RoutineChartComponent } from './routine-chart/routine-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GoogleFitStepsResolver } from 'src/models/resolvers/google-fit-steps.resolver';
import { GoogleFitCaloriesResolver } from 'src/models/resolvers/google-fit-calories.resolver';
const routes: Routes = [
  {
    path: '',
    component: RoutinesComponent,
    resolve: {
      dailyRoutine: DailyRoutinesResolver,
      weeklySteps: GoogleFitStepsResolver,
      weeklyCalories: GoogleFitCaloriesResolver,
    },
  },
];

@NgModule({
  declarations: [RoutinesComponent, RoutineChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CustomComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxChartsModule,
    MdbModule,
  ],
  providers: [DailyRoutinesResolver, GoogleFitStepsResolver, GoogleFitCaloriesResolver],
})
export class RoutinesModule {}
