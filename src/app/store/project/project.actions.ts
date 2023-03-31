import { createAction, props } from '@ngrx/store';
import {Project} from "../../core/interfaces";

export const loadProjects = createAction(
  '[Project] Load Projects'
);

export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ projects: Project[]}>()
);

export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{ error: any }>()
);

export const setProject = createAction(
  '[Project] Set Project',
  props<{ projectId: number}>()
)

export const setProjectSuccess = createAction(
  '[Project] Set Project Success',
  props<{ data: any}>()
)
export const setProjectsFailure = createAction(
  '[Project] Set Projects Failure',
  props<{ error: any }>()
);

export const initCurrentProject = createAction(
  '[Project]  Init Current Project'
);

export const saveProjectSuccess = createAction(
  '[Project] Create Project Success',
  props<{project: Project}>()
)
export const createProject = createAction(
  '[Project] Create Project ',
  props<{ project: Project }>()
);

export const updateProject = createAction(
  '[Project] Update Project ',
  props<{ projectId: number; project: Project }>()
);

//--
export const loadAllProjects = createAction('[Project] Load All Projects ');

export const loadAllProjectsSuccess = createAction(
  '[Project] Load All Projects Success',
  props<{ projects: Project[] }>()
);

export const loadAllProjectsFailure = createAction(
  '[Project] Load All Projects Failure',
  props<{ error: any }>()
);
