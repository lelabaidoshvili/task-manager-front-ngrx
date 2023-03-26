import { Component, OnInit, Inject } from '@angular/core';
import {UsersFacadeService} from "../../../facades/users-facade.service";
import {UsersResponse} from "../../../core/interfaces";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleFacadeService} from "../../../facades/role.facade.service";
import {Observable} from "rxjs";
import {RoleResponse} from "../../../core/interfaces/role.interface";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UsersHttpService} from "../../../core/services/users-http.service";

@Component({
  selector: 'app-users-role',
  templateUrl: './users-role.component.html',
  styleUrls: ['./users-role.component.scss']
})
export class UsersRoleComponent implements OnInit {
  form: FormGroup = new FormGroup({
    roles: new FormControl([], Validators.required)
  });
  roles$: Observable<RoleResponse[]> = this.roleService.getAllRoles()

  constructor(
    public dialogRef: MatDialogRef<UsersRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: UsersResponse },
    private roleService: RoleFacadeService,
    private userService: UsersHttpService
  ) {
  }

  ngOnInit(): void {
    if (this.data.user.roles) {
      this.form.patchValue({
        roles: this.data.user.roles.map((r: RoleResponse) => r.id)
      })
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {roles} = this.form.value;
    this.userService.createUsersRoles({
      userId: this.data.user.id,
      roleIds: roles
    })
      .subscribe(() => {
        this.dialogRef.close(true);
      })
  }

}
