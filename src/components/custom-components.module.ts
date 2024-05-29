import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AutoSearchInputComponent } from './auto-search-input/auto-search-input.component';
import { BackButtonDirective } from './back-button.directive';
import { DashboardValueCardComponent } from './dashboard-value-card/dashboard-value-card.component';
import { FileSizePipe } from './file-size.pipe';
import { InfoFooterComponent } from './info-footer/info-footer.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { InfoHeaderBarComponent } from './info-header-bar/info-header-bar.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { LabelInfoComponent } from './label-info/label-info.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MdbModule } from './mdb/mdb.module';
import { NbRangeDatepickerComponent } from './nb-range-datepicker/nb-range-datepicker.component';
import { NbSimpleSelectComponent } from './nb-simple-select/nb-simple-select.component';
import { NbSimpleTableHeaderComponent } from './nb-simple-table-header/nb-simple-table-header.component';
import { NbSimpleTableSelectComponent } from './nb-simple-table-select/nb-simple-table-select.component';
import { NgForFilterPipe } from './ng-for-filter.pipe';
import { PageNavigationButtonsComponent } from './page-navigation-buttons/page-navigation-buttons.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgForTrackByIdDirective } from './track-by-id.directive';
import { TreeSelectComponent } from './tree-select/tree-select.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';

@NgModule({
  declarations: [
    AutoSearchInputComponent,
    BackButtonDirective,
    DashboardValueCardComponent,
    FileSizePipe,
    InfoFooterComponent,
    InfoHeaderBarComponent,
    HeaderBarComponent,
    InputNumberComponent,
    LoadingSpinnerComponent,
    NbRangeDatepickerComponent,
    NbSimpleSelectComponent,
    NbSimpleTableHeaderComponent,
    NbSimpleTableSelectComponent,
    NgForFilterPipe,
    NgForTrackByIdDirective,
    PageNavigationButtonsComponent,
    SafeUrlPipe,
    ScrollToBottomDirective,
    SideBarComponent,
    ValidationErrorsComponent,
    TreeSelectComponent,
    LabelInfoComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MdbModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AutoSearchInputComponent,
    BackButtonDirective,
    DashboardValueCardComponent,
    FileSizePipe,
    InfoFooterComponent,
    InfoHeaderBarComponent,
    HeaderBarComponent,
    InputNumberComponent,
    LoadingSpinnerComponent,
    NbRangeDatepickerComponent,
    NbSimpleSelectComponent,
    NbSimpleTableHeaderComponent,
    NgForFilterPipe,
    NgForTrackByIdDirective,
    PageNavigationButtonsComponent,
    SafeUrlPipe,
    SideBarComponent,
    ScrollToBottomDirective,
    ValidationErrorsComponent,
    TreeSelectComponent,
    LabelInfoComponent,
  ],
})
export class CustomComponentsModule {}
