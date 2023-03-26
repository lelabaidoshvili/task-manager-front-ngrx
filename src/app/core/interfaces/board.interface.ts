import { Project } from './project.interface';
import { TasksResponse, TaskStatusEnumInterface } from './task';
// payload interface
export interface Board {
  name: string;
  description: string;
  position: number;
  columns: BoardColumn[];
}

export interface BoardColumn {
  name: string;
  description: string;
  position: number;
  boardId: number;
  taskStatus: TaskStatusEnumInterface[];
  id?: number;
}

//response interface
export interface BoardResponse {
  id: number;
  name: string;
  description: string;
  position: number;
  projectId: number;
  project: Project;
  columns: ColumnResponse[];
  tasks: TasksResponse[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ColumnResponse {
  id: number;
  name: string;
  description: string;
  position: number;
  boardId: number;
  board: string;
  tasks: TasksResponse[];
  taskStatus: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CreatedBy {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
}

export interface DeletedBy {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
}
