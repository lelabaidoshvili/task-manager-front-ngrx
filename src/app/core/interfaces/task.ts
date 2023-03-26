import { TaskStatus } from '../enums/taskStatus.enum';
import { Assignee } from './assignee.interface';
import {
  BoardResponse,
  ColumnResponse,
  CreatedBy,
  DeletedBy,
} from './board.interface';
import { EpicResponse } from './epic.interface';

import { IssueTypeResponse } from './issuetype.interface';
import { Project } from './project.interface';
import { Reporter } from './reporter.interface';

//payload interfaces
export interface TaskInterface {
  name: string;
  description: string;
  issueTypeId: number;
  taskProperty: TaskProperty[];
  epicId?: number;
  boardId: number;
  boardColumnId?: number;
  isBacklog: boolean;
  priority: Priority[];
  taskStatus: TaskStatusEnumInterface[];
  assigneeId: number;
  reporterId: number;
}

export interface Priority {
  LOW: string;
  MEDIUM: string;
  HIGH: string;
}
export interface TaskProperty {
  id: number;
  name: string;
  filedName: string;
  value: string;
  isRequired: boolean;
}
export interface TaskStatusEnumInterface {
  ToDo: string;
  InProgress: string;
  Done: string;
}

//put payload
export interface TaskPutInterface {
  name: string;
  description: string;
  issueTypeId: number;
  taskProperty: TaskProperty2[];
  epicId: number;
  boardId: number;
  boardColumnId: number;
  isBacklog: boolean;
  priority: Priority[];
  taskStatus: TaskStatusEnumInterface[];
  assigneeId: number;
  reporterId: number;
}
export interface TaskProperty2 {
  name: string;
  description: string;
  issueTypeId: number;
  taskProperty: TaskProperty[];
  epicId: number;
  boardId: number;
  boardColumnId: number;
  isBacklog: boolean;
  priority: Priority[];
  taskStatus: TaskStatusEnumInterface[];
  assigneeId: number;
  reporterId: number;
  id: number;
}

//response interfaces

export interface TasksResponse {
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
  issueType: IssueTypeResponse;
  epicId: number;
  epic: EpicResponse;
  projectId: number;
  project: Project;
  boardId: number;
  board: BoardResponse;
  boardColumnId: number;
  boardColumn: ColumnResponse;
  isBacklog: boolean;
  priority: Priority[];
  taskStatus: TaskStatusEnumInterface[];
  assigneeId: number;
  assignee: Assignee;
  reporterId: number;
  reporter: Reporter;
  createdById: number;
  createdBy: CreatedBy;
  deletedById: number;
  deletedBy: DeletedBy;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  taskProperty: TaskProperty[];
}
export interface TaskDeleteResponse {
  deleted: boolean;
  message: string;
}
