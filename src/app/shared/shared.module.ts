import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { NotificationComponent } from './notification/notification.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading-spinner/loading.interceptor';
import { QuantityFieldComponent } from './quantity-field/quantity-field.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    NotificationComponent,
    QuantityFieldComponent,
  ],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  exports: [
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    NotificationComponent,
    QuantityFieldComponent,
  ],
})
export class SharedModule {}
