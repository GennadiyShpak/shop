import { NgModule } from '@angular/core';
import {ProductListModule} from "./product-list/product-list.module";
import {FeatureRoutingModule} from "./feature-routing.module";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FeatureComponent } from './feature.component';
import {CoreModule} from "../core/core.module";
import {FirstComponent} from "./first/first.component";



@NgModule({
  declarations: [
    LoginComponent,
    FirstComponent,
    FeatureComponent,
  ],
  imports: [
    FormsModule,
    CoreModule,
    ProductListModule,
    ReactiveFormsModule,
    FeatureRoutingModule,
  ]
})
export class FeatureModule { }
