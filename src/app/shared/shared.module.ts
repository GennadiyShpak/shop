import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { HighlightingDirective } from './directives/highlighting.directive';



@NgModule({
  declarations: [ProductComponent, HighlightingDirective],
  imports: [
    CommonModule
  ],
  exports: [ProductComponent, HighlightingDirective],
})
export class SharedModule { }
