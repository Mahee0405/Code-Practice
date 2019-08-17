import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './Components/customer.component';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [CustomerComponent],
  imports: [
     CustomerRoutingModule,
     SharedModule
  ]
})
export class CustomerModule { }
