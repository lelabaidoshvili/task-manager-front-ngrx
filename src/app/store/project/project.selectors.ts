import {createSelector} from "@ngrx/store";

export const currentProject = createSelector(
  (state: any) => state.project.currentProject,
  (currentProject) => currentProject
)
export const myProjects = createSelector(
  (state: any) => state.project.projects,
  (projects) => projects
);
