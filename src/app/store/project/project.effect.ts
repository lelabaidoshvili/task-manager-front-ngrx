import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectHttpService} from "../../core/services/project-http.service";
import {
  loadProjects,
  loadProjectsSuccess,
  loadProjectsFailure,
  setProject,
  setProjectSuccess,
  setProjectsFailure, initCurrentProject
} from "./project.actions";
import {switchMap, of, catchError, map} from "rxjs";
import {Selector, select, Store} from "@ngrx/store";



@Injectable()
export class ProjectEffect {
  constructor(
    private actions$: Actions,
    private projectService: ProjectHttpService,
    private store: Store
  ) {
  }
  loadProjects$ = createEffect(()=> this.actions$.pipe (
    ofType(loadProjects),
    switchMap(() => this.projectService.getMyProjects().pipe(
      map((data) => loadProjectsSuccess({data})),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))

  setProject$ = createEffect(() => this.actions$.pipe (
    ofType(setProject),
    switchMap((action) => this.projectService.getProjectById(action.projectId).pipe(
      map((data) => setProjectSuccess({data})),
      catchError((error) =>of(setProjectsFailure({error})))
    ))
  ) )

  setProjectSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(setProjectSuccess),
    map((action) => {
      localStorage.setItem('project', JSON.stringify(action.data))
    })
  ), {dispatch: false})

  // initCurrentProject$ = createEffect(() => this.actions$.pipe(
  //   ofType(initCurrentProject),
  //   map(() => {
  //     const project = localStorage.getItem('project');
  //     return project ? JSON.parse(project) : null;
  //   })
  // ))

}
