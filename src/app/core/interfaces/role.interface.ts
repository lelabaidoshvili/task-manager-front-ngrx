//payload

export interface Role {
  name: string;
}

export interface RoleEnumInterface {
  SYSTEM: string;
  CUSTOM: string;
}

export interface RolePermissionsInterface {
  roleId: string;
  permissionIds: string[];
}

//response
export interface RoleResponse {
  id: string;
  createdAt: Date;
  name: string;
  type: string;
  permissions: string[];
}

export interface RoleListResponse {
  data: RoleResponse[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface RoleDeleteResponse {
  deleted: boolean;
  message: string;
}
