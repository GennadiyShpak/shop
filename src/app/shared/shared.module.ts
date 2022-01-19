import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { HighlightingDirective } from './directives/highlighting.directive';
import { BackgroundColorDirective } from './directives/background-color.directive';
import { AppInfoComponent } from './components/app-info/app-info/app-info.component';
import { FirstComponent } from './components/first/first.component';



@NgModule({
  declarations: [ProductComponent, HighlightingDirective, BackgroundColorDirective, AppInfoComponent, FirstComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductComponent, HighlightingDirective, AppInfoComponent],
})
export class SharedModule { }
