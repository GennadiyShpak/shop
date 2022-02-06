import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessOrderRoutingModule } from './process-order-routing.module';
import {ProcessOrderComponent} from "./process-order.component";


@NgModule({
  declarations: [ProcessOrderComponent],
  imports: [
    CommonModule,
    ProcessOrderRoutingModule
  ]
})
export class ProcessOrderModule { }
