import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomComponentsModule } from 'src/components/custom-components.module';
import { MdbModule } from 'src/components/mdb/mdb.module';
import { RoutinesComponent } from './routines.component';
import { DailyRoutinesResolver } from 'src/models/resolvers/daily-routine.resolver';
const routes: Routes = [
  {
    path: '',
    component: RoutinesComponent,
    resolve: { dailyRoutine: DailyRoutinesResolver },
  },
];

@NgModule({
  declarations: [RoutinesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CustomComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MdbModule,
  ],
  providers: [DailyRoutinesResolver],
})
export class RoutinesModule {}
