import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomComponentsModule } from 'src/components/custom-components.module';
import { MdbModule } from 'src/components/mdb/mdb.module';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';

@NgModule({
  declarations: [EditUserModalComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MdbModule,
    CustomComponentsModule,
  ],
  exports: [],
})
export class CustomModalsModule {}
