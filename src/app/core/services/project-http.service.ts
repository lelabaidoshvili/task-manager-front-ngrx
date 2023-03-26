import { Injectable } from '@angular/core';

import {
  Project,
  ProjectDeleteResponse,
  ProjectUsers,
  UsersResponse,
} from '../interfaces';

import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../interfaces/pagination-response';

@Injectable({
  providedIn: 'root',
})
export class ProjectHttpService extends BaseService {
  createProject(payload: Project): Observable<Project> {
    return this.post<Project>('project', payload);
  }

  addUsersToProject(payload: ProjectUsers): Observable<Project> {
    return this.post<Project>('project/users', payload);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.put<Project>(`project/${id}`, project);
  }

  deleteProject(id: number): Observable<ProjectDeleteResponse> {
    return this.delete<ProjectDeleteResponse>(`project/${id}`);
  }

  getAllProjects(): Observable<Project[]> {
    return this.get<Project[]>('project/all');
  }

  getProjects(): Observable<PaginationResponse<Project>> {
    return this.get<PaginationResponse<Project>>('project');
  }

  getMyProjects(): Observable<Project[]> {
    return this.get<Project[]>('project/my');
  }
  getProjectById(id: number): Observable<Project> {
    return this.get<Project>(`project/${id}`);
  }

  getProjectUsers(): Observable<UsersResponse[]> {
    return this.get<UsersResponse[]>('project/users');
  }

  removeUserFromProject(data: {projectId: any; userId: any; }): Observable<any> {
    return this.delete(`project/users/${data.userId}`);
  }
}
