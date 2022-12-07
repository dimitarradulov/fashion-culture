import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutItemComponent } from './checkout-item/checkout-item.component';
import { CheckoutSucessComponent } from './checkout-sucess/checkout-sucess.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
  {
    path: 'success/:orderId',
    component: CheckoutSucessComponent,
  },
];

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutItemComponent,
    CheckoutSucessComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class CheckoutModule {}
