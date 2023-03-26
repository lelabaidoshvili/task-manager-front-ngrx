import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BoardResponse, Project } from 'src/app/core/interfaces';
import { BoardFacadeService } from 'src/app/facades/board-facade.service';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { AuthFacadeService } from 'src/app/pages/auth/auth-facade.service';
import { StepperService } from 'src/app/pages/stepper/stepper.service';
import {Store} from "@ngrx/store";
import {initCurrentProject, loadProjects, ProjectStateModule, setProject} from "../../../store";
import {currentProject} from "../../../store/project/project.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authFacadeService: AuthFacadeService = inject(AuthFacadeService);
  //--
  // currentProject?: Project = this.projectFacadeService.getProject();
  currentProject?: Project | null
  //--
  currentBoards: any;

  projects$ = this.store.select( state => state.project.projects);
  currentUser;
  currentUsersProjects;
  toggle: boolean = false;

  get loggedIn() {
    return this.authFacadeService.token;
  }

  constructor(
    private store: Store<{project: ProjectStateModule}>,
    private router: Router,
     private projectFacadeService: ProjectFacadeService,

    private boardFacadeService: BoardFacadeService,
    private stepperService: StepperService,

    private route: ActivatedRoute
  ) {
    this.toggle = false;
  }

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
    this.store.dispatch(initCurrentProject());
    // this.projectFacadeService.current.subscribe((res) => {
    //   if (res) {
    //     this.currentProject = this.projectFacadeService.current.getValue();
    //   }
    // });
    this.store.select(currentProject).subscribe((project) => {
      this.currentProject = project
    })

    this.authFacadeService.user$.subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
      this.currentUsersProjects = this.currentUser?.projects;
      console.log('current users project');

      console.log(this.currentUsersProjects);

    });
    this.currentUser = this.authFacadeService.user;
  }

  public signOut(): void {
    localStorage.removeItem('user');
    this.authFacadeService.signOut();

    this.router.navigate(['/']);

  }

  // selectProject(projectId: number) {
  //   this.projectFacadeService.setProject(projectId);
  // }
  selectProject(projectId: number) {
    this.store.dispatch(setProject({projectId}));
  }

  // getMyProjects() {
  //   this.projectFacadeService.getOnlyMyProjects$().subscribe();
  // }
  getMyProjects() {
    this.store.dispatch(loadProjects());
  }

  goToStepper() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(0);
  }

  //--
  toggleMenu() {
    this.toggle = !this.toggle;
  }
  //--

  ngOnDestroy() {}
}
