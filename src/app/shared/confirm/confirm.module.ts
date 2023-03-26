import { NgModule } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import {SharedModule} from "../shared.module";



@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ConfirmComponent
  ]

})
export class ConfirmModule { }
