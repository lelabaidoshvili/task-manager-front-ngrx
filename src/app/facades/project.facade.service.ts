import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Project, ProjectUsers, UsersResponse } from '../core/interfaces';

import { ProjectHttpService } from '../core/services/project-http.service';
import { BoardFacadeService } from './board-facade.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectFacadeService {
  myProjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  projects$ = this.myProjects.asObservable();
  myUsers: BehaviorSubject<UsersResponse[]> = new BehaviorSubject<
    UsersResponse[]
  >([]);

  users$ = this.myUsers.asObservable();

  current: BehaviorSubject<Project> = new BehaviorSubject<Project>(
    this.getProject()
  );
  current$ = this.current.asObservable();

  activate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private projectHttpService: ProjectHttpService,
    private boardFacadeService: BoardFacadeService
  ) {}

  setProject(projectId: number): void {
    this.projectHttpService
      .getProjectById(projectId)
      .subscribe((project: Project) => {
         localStorage.setItem('project', JSON.stringify(project));

        this.current.next(project);
        // this.activateCurrent.next(true);
      });
  }
  // .pipe(tap((res) => this.current.next(res)))
  getProject(): Project {
    const projectString = localStorage.getItem('project');
    if (!projectString) {
      return null;
    }
    try {
      return JSON.parse(projectString);
    } catch (error) {
      console.error('Error parsing project JSON:', error);
      return null;
    }
  }

  //needs to be changed ,change into getOnlyMyProjects$()
  getMyProjects() {
    return this.projectHttpService.getMyProjects();
  }

  getProjects() {
    return this.projectHttpService.getAllProjects();
  }

  updateProject(id: number, project: Project) {
    return this.projectHttpService.updateProject(id, project);
  }

  getProjectById(id: number) {
    return this.projectHttpService.getProjectById(id);
  }

  deleteProject(id: number) {
    return this.projectHttpService.deleteProject(id);
  }

  getOnlyMyProjects$(): Observable<Project[]> {
    return this.projectHttpService
      .getMyProjects()
      .pipe(tap((projects) => this.myProjects.next(projects)));
  }

  getProjectUsers$(): Observable<UsersResponse[]> {
    return this.projectHttpService.getProjectUsers().pipe(
      tap((projectUsers) => {
        this.myUsers.next(projectUsers);
      })
    );
  }

  addUsersToProject(payload: ProjectUsers) {
    return this.projectHttpService.addUsersToProject(payload);
  }
}
