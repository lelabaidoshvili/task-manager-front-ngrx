import {on, createReducer} from "@ngrx/store";
import {
  initCurrentProject,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess,
  setProject,
  setProjectsFailure,
  setProjectSuccess
} from "./project.actions";
import {Project} from "../../core/interfaces";


export interface ProjectStateModule {
  projects: Project[]
  currentProject: Project | null
}

const  initialState: ProjectStateModule = {
  projects: [],
  currentProject: null
}
export const projectReducer = createReducer(
  initialState,
  on(loadProjects, state => state),
  on(loadProjectsSuccess, (state, action) => {
    return {
      ...state,
      projects: action.data
    }
  }),
  on(loadProjectsFailure, (state, action) => state),
  // on(setProject, (state, action) =>state),
  // on(setProjectSuccess, (state, action) => {
  //   return {
  //     ...state,
  //     currentProject: action.data
  //   }
  // }),
  //  on(setProjectsFailure, (state, action) => state),
    on(setProject, (state, action)  => {
      const project = state.projects.find((project) => project.id === +action.projectId);
      project && localStorage.setItem('project', JSON.stringify(project))
         return {
           ...state,
           currentProject: project || null
        }
       }),
    on(initCurrentProject, (state) => {
      const project = localStorage.getItem('project');
      return {
        ...state,
        currentProject: project ? JSON.parse(project) : null
      }
    })


    // on(setProjectSuccess, (state, action) => {
    //   return {
    //     ...state,
    //     currentProject: action.data
    //   }
    // }),
    // on(setProjectsFailure, (state, action) => state)
    //

);

