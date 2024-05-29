import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomComponentsModule } from 'src/components/custom-components.module';
import { MdbModule } from 'src/components/mdb/mdb.module';
import { DietsComponent } from './diets.component';
import { DailyDietResolver } from 'src/models/resolvers/daily-diet.resolver';

const routes: Routes = [
  {
    path: '',
    component: DietsComponent,
    resolve: { dailyDiet: DailyDietResolver },
  },
];

@NgModule({
  declarations: [DietsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MdbModule,
  ],
  providers: [DailyDietResolver],
})
export class DietsModule {}
