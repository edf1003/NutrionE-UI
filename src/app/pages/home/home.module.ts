import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomComponentsModule } from 'src/components/custom-components.module';
import { MdbModule } from 'src/components/mdb/mdb.module';
import { HomeComponent } from './home.component';
import { GoogleFitStepsResolver } from 'src/models/resolvers/google-fit-steps.resolver';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GoogleFitCaloriesResolver } from 'src/models/resolvers/google-fit-calories.resolver';
import { HomeStepsChartComponent } from './home-steps-chart/home-steps-chart.component';
import { HomeCaloriesChartComponent } from './home-calories-chart/home-calories-chart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { weeklySteps: GoogleFitStepsResolver, weeklyCalories: GoogleFitCaloriesResolver },
  },
];

@NgModule({
  declarations: [HomeComponent, HomeStepsChartComponent, HomeCaloriesChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MdbModule,
    NgxChartsModule,
  ],
  providers: [GoogleFitStepsResolver, GoogleFitCaloriesResolver],
})
export class HomeModule {}
