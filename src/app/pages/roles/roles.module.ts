import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { RolesComponent } from './roles/roles.component';
import {SharedModule} from "../../shared/shared.module";
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { PermissionsAddEditComponent } from './permissions-add-edit/permissions-add-edit.component';



@NgModule({
  declarations: [
    RolesComponent,
    RoleAddEditComponent,
    PermissionsAddEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: RolesComponent
      },
      {
        path: 'permissions/:roleId',
        component: PermissionsAddEditComponent
      }
    ])
  ]
})
export class RolesModule { }
