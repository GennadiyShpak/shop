import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { HighlightingDirective } from './directives/highlighting.directive';
import { BackgroundColorDirective } from './directives/background-color.directive';
import { AppInfoComponent } from './components/app-info/app-info/app-info.component';
import { FirstComponent } from './components/first/first.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ProductComponent,
    HighlightingDirective,
    BackgroundColorDirective,
    AppInfoComponent,
    FirstComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductComponent,
    HighlightingDirective,
    AppInfoComponent,
    OrderByPipe,
    FirstComponent,
    CommonModule,
    FormsModule
  ],
})
export class SharedModule { }
