import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  first,
  map,
  mapTo,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ProjectHttpService } from 'src/app/core/services/project-http.service';
import { BoardFacadeService } from 'src/app/facades/board-facade.service';
import { StepperService } from 'src/app/pages/stepper/stepper.service';

import {
  createProject,
  initCurrentProject,
  loadAllProjects,
  loadAllProjectsFailure,
  loadAllProjectsSuccess,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess,
  setProject,
  updateProject,
} from './project.actions';
import { ProjectStateModule } from './project.reducer';


@Injectable()
export class ProjectEffect {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private stepperService: StepperService,
    private boardFacadeService: BoardFacadeService,
    private actions$: Actions,
    private projectService: ProjectHttpService,
    private store: Store<{ project: ProjectStateModule }>
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      switchMap(() =>
        this.projectService.getMyProjects().pipe(
          map((projects) => loadProjectsSuccess({ projects })),
          catchError((error) => of(loadProjectsFailure({ error })))
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProject),
      concatMap((action) =>
        this.projectService.createProject(action.project).pipe(
          tap((res) => {
            this.store.dispatch(loadProjects());
          }),
          map((res) => {
            this.boardFacadeService.additional.next(false);
            this._snackBar.open('Project Created', 'Close', { duration: 2000 });
            setTimeout(() => {
              this.stepperService.goToStep(1);
            }, 3000);

            return loadProjects();
          }),
          catchError((error) => of(loadProjectsFailure({ error })))
        )
      ),
      switchMap(() =>
        this.actions$.pipe(
          ofType(loadProjectsSuccess),
          map((action) =>
            setProject({
              projectId: action.projects[0].id,
            })
          )
        )
      ),
      catchError((error) => of(loadProjectsFailure({ error })))
    )
  );

  // createProject$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(createProject),
  //     concatMap((action) =>
  //       this.projectService.createProject(action.project).pipe(
  //         tap((res) => {
  //           this.store.dispatch(loadProjects());
  //           this.store.dispatch(setProject({ projectId: res.id }));
  //         }),
  //         map((res) => {
  //           this.boardFacadeService.additional.next(false);
  //           this._snackBar.open('Project Created', 'Close', { duration: 2000 });
  //           setTimeout(() => {
  //             this.stepperService.goToStep(1);
  //           }, 3000);

  //           return loadProjects();
  //         }),
  //         catchError((error) => of(loadProjectsFailure({ error })))
  //       )
  //     )
  //   )
  // );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      switchMap((action) =>
        this.projectService
          .updateProject(action.projectId, action.project)
          .pipe(
            tap((res) =>
              this.store.dispatch(setProject({ projectId: res.id }))
            ),
            map((data) => {
              this.router.navigate(['/tables']);
              return loadProjects();
            }),
            catchError((error) => of(loadProjectsFailure({ error })))
          )
      )
    )
  );

  loadAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllProjects),
      switchMap(() =>
        this.projectService.getAllProjects().pipe(
          map((projects) => loadAllProjectsSuccess({ projects })),
          catchError((error) => of(loadAllProjectsFailure({ error })))
        )
      )
    )
  );
}
