import {createSelector} from "@ngrx/store";

export const currentProject = createSelector(
  (state: any) => state.project.currentProject,
  (currentProject) => currentProject
)
