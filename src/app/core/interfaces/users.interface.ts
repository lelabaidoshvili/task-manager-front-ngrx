//payload
import { Project } from './project.interface';
import { RoleResponse } from './role.interface';
export interface Users {
  firstName: string;
  lastName: string;
  identityNumber?: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
}

//response
export interface UsersResponse {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: RoleResponse[];
  projects: Project[];
}

export interface UsersDeleteResponse {
  deleted: boolean;
  message: string;
}

export interface UsersDataResponse {
  data: UsersResponse[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface UsersRole {
  userId: number;
  roleIds: string[];
}

export interface UserPasswordUpdate {
  oldPassword: string;
  password: string;
  checkPassword: string;
}
