import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Role,
  RoleDeleteResponse,
  RoleListResponse,
  RolePermissionsInterface,
  RoleResponse,
} from '../interfaces/role.interface';
import { BaseService } from './base.service';
import { PaginationResponse } from '../interfaces/pagination-response';

@Injectable({
  providedIn: 'root',
})
export class RoleHttpService extends BaseService {
  createRole(payload: Role): Observable<RoleResponse> {
    return this.post<RoleResponse>('role', payload);
  }

  getRole(params = {}): Observable<PaginationResponse<RoleResponse>> {
    return this.get('role', params);
  }

  getRolePermission(): Observable<any[]> {
    return this.get('role/permission');
  }

  getMyRole(): Observable<RoleListResponse> {
    return this.get<RoleListResponse>('role/my');
  }

  getAllRoles(): Observable<RoleResponse[]> {
    return this.get<RoleResponse[]>('role/all');
  }

  addPermissionsToRole(
    payload: RolePermissionsInterface
  ): Observable<RoleResponse> {
    return this.post<RoleResponse>('role/permissions');
  }

  getRoleById(id: string): Observable<any> {
    return this.get<any>(`role/${id}`);
  }
  updateRoleById(id: string, payload: Role): Observable<RoleResponse> {
    return this.put<RoleResponse>(`role/${id}`);
  }

  deleteRoleById(id: string): Observable<RoleDeleteResponse> {
    return this.delete<RoleDeleteResponse>(`role/${id}`);
  }
  setPermissions(params: {
    roleId: string;
    permissions: number[];
  }): Observable<any> {
    return this.post(`role/permissions`, params);
  }
}
