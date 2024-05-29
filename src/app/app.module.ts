import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import * as dayjs from 'dayjs';
import * as es from 'dayjs/locale/es';
import * as minMax from 'dayjs/plugin/minMax';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { ToastrModule } from 'ngx-toastr';
import { CustomComponentsModule } from 'src/components/custom-components.module';
import { MdbModule } from 'src/components/mdb/mdb.module';
import { CustomModalsModule } from 'src/modals/custom-modals.module';
import { FormArrayUtilsService } from 'src/services/form-array-utils.service';
import { NbSimpleTableService } from 'src/services/nb-simple-table.service';
import { UsersService } from 'src/services/users.service';
import { UtilsService } from 'src/services/utils.service';
import { CustomToastComponent } from '../components/custom-toast/custom-toast.component';
import { EnumsService } from '../services/enums.service';
import { ObsAlertsService } from '../services/obs-alerts.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';
import { DailyRoutinesService } from 'src/services/daily-routines.service';
import { DailyDietsService } from 'src/services/daily-diets.service';
import { GoogleFitService } from 'src/services/google-fit.service';
registerLocaleData(localeEs, 'es');
dayjs.locale({
  ...es,
});
dayjs.extend(weekOfYear);
dayjs.extend(minMax);

@NgModule({
  declarations: [AppComponent, CustomToastComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomComponentsModule,
    CustomModalsModule,
    FontAwesomeModule,
    LoadingBarHttpClientModule,
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
      preventDuplicates: true,
      timeOut: 5000,
      toastComponent: CustomToastComponent,
    }),
    FormsModule,
    ReactiveFormsModule,
    MdbModule,
  ],
  providers: [
    ObsAlertsService,
    UsersService,
    UtilsService,
    EnumsService,
    DailyRoutinesService,
    DailyDietsService,
    FormArrayUtilsService,
    NbSimpleTableService,
    GoogleFitService,
    [
      { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    [{ provide: LOCALE_ID, useValue: 'es-ES' }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
