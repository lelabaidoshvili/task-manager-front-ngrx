import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './header/header.component';
import {SharedModule} from "../../shared/shared.module";
import {PermissionsDirective} from "../../core/directives/permissions.directive";
import {StoreModule} from "@ngrx/store";
import {ProjectEffect, projectReducer} from "../../store";
import {EffectsModule} from "@ngrx/effects";




@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    PermissionsDirective,
    StoreModule.forRoot({
      project: projectReducer
    }, {}),
    EffectsModule.forRoot([
      ProjectEffect
    ]),

  ]
})
export class MainLayoutModule { }
