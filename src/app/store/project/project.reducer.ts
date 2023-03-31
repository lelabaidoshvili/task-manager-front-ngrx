import { createReducer, on } from '@ngrx/store';
import { Project } from 'src/app/core/interfaces';
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
export interface ProjectStateModule {
  projects: Project[];
  currentProject: Project | null;
}

const initialState: ProjectStateModule = {
  projects: [],
  currentProject: null,
};
export const projectReducer = createReducer(
  initialState,
  on(loadProjects, (state) => state),
  on(loadProjectsSuccess, (state, action) => {
    return {
      ...state,
      projects: action.projects,
    };
  }),
  on(loadProjectsFailure, (state, action) => state),

  on(setProject, (state, action) => {
    const project = state.projects.find(
      (project) => project.id === +action.projectId
    );
    project && localStorage.setItem('project', JSON.stringify(project));
    return {
      ...state,
      currentProject: project || null,
    };
  }),

  on(initCurrentProject, (state) => {
    const project = localStorage.getItem('project');
    return {
      ...state,
      currentProject: project ? JSON.parse(project) : null,
    };
  }),
  on(createProject, (state, action) => {
    return {
      ...state,
      projects: [action.project, ...state.projects],
    };
  }),
  on(updateProject, (state, action) => {
    const index = state.projects.findIndex(
      (project) => project.id === +action.projectId
    );
    const updatedProjects = state.projects.map((project, i) => {
      if (i === index) {
        return action.project;
      }
      return project;
    });
    return {
      ...state,
      projects: updatedProjects,
    };
  }),
  //--
  on(loadAllProjects, (state) => state),
  on(loadAllProjectsSuccess, (state, action) => {
    return {
      ...state,
      projects: action.projects,
    };
  }),
  on(loadAllProjectsFailure, (state, action) => state)
);
