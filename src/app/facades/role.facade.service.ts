import { Injectable } from '@angular/core';
import {
  Role,
  RolePermissionsInterface,
} from '../core/interfaces/role.interface';
import { RoleHttpService } from '../core/services/role-http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleFacadeService {
  constructor(private roleHttpService: RoleHttpService) {}

  createRole(payload: Role) {
    return this.roleHttpService.createRole(payload);
  }

  getRole() {
    return this.roleHttpService.getRole();
  }

  getMyRole() {
    return this.roleHttpService.getMyRole();
  }

  getAllRoles() {
    return this.roleHttpService.getAllRoles();
  }

  addPermissionsToRole(payload: RolePermissionsInterface) {
    return this.roleHttpService.addPermissionsToRole(payload);
  }

  getRoleById(id: string) {
    return this.roleHttpService.getRoleById(id);
  }

  updateRoleById(id: string, payload: Role) {
    return this.roleHttpService.updateRoleById(id, payload);
  }

  deleteRoleById(id: string) {
    return this.roleHttpService.deleteRoleById(id);
  }

}
