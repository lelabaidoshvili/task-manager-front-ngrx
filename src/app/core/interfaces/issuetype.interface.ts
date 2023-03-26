import { IssueTypeEnum } from '../enums/issue-type.enum';
//payload interface
export interface IssueType {
  id?: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  type: IssueTypeEnum[];
  issueTypeColumns: IssueTypeColumn[];
}

export interface IssueTypeColumn {
  name: string;
  filedName: string;
  isRequired: boolean;
  issueTypeId: number;
}

//response interface

export interface IssueTypeResponse {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  type: string;
  issueTypeColumns: IssueTypeColumnResponse[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
export interface IssueTypeColumnResponse {
  id: number;
  name: string;
  filedName: string;
  type: string;
  isRequired: boolean;
  issueTypeId: number;
  issueType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IssueDeletedResponse {
  deleted: boolean;
  message: string;
}
