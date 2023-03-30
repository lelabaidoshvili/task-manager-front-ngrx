import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import { BoardFacadeService } from '../../facades/board-facade.service';
import { Project, UsersResponse } from 'src/app/core/interfaces';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { IssueTypeFacadeService } from '../../facades/issue-type.facade.service';
import { IssueTypeResponse } from '../../core/interfaces/issuetype.interface';
import { BoardResponse } from 'src/app/core/interfaces';
import {
  Subject,
  takeUntil,
  Observable,
  switchMap,
  tap,
  combineLatest,
} from 'rxjs';
import { Router } from '@angular/router';
import { StepperService } from '../stepper/stepper.service';
import { UsersFacadeService } from 'src/app/facades/users-facade.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectHttpService } from '../../core/services/project-http.service';
import {Store} from "@ngrx/store";
import {ProjectStateModule} from "../../store";
import {currentProject} from "../../store/project/project.selectors";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );

  currentProject: Project | null;
  currentBoards: BoardResponse[];
  projectUsers = [];

  // myBoard: BoardResponse[] = [];
  myIssue: IssueTypeResponse[] = [];

  sub$ = new Subject<any>();
  task = '';

  number = 0;
  x = 0;

  constructor(
    private store: Store<{project: ProjectStateModule}>,
    private projectFacadeService: ProjectFacadeService,
    private boardFacadeService: BoardFacadeService,
    private IssueTypeFacadeService: IssueTypeFacadeService,
    private router: Router,
    private stepperService: StepperService,
    private usersFacadeService: UsersFacadeService,
    public dialog: MatDialog,
    public projectService: ProjectHttpService
  ) {}

  ngOnInit(): void {
    this.store.select(currentProject).subscribe((project) => {
      this.currentProject = project;
      if(this.currentProject) {
        this.loadAllInTasks();
      }

    })

    // this.projectFacadeService.current.subscribe((res) => {
    //   if (res) {
    //     this.loadAllInTasks();
    //   }
    // });

    //------------------
    // this.projectFacadeService.current$
    //   .pipe(takeUntil(this.sub$))
    //   .subscribe((res) => {
    //     this.currentProject = res;
    //   });
    // this.projectFacadeService.activateCurrent.subscribe((res) => {
    //   if (res) {
    //     this.boardFacadeService
    //       .getMyBoards$()
    //       .pipe(takeUntil(this.sub$))
    //       .subscribe((boards) => {
    //         this.currentBoards = boards;
    //       });
    //   }
    // });
    // this.projectFacadeService.activateCurrent.subscribe((res) => {
    //   if (res) {
    //     this.projectFacadeService
    //       .getProjectUsers$()
    //       .pipe(takeUntil(this.sub$))
    //       .subscribe((users) => {
    //         this.projectUsers = users;
    //         console.log(users);
    //       });
    //   }
    // });
    // this.projectFacadeService.activateCurrent.subscribe((res) => {
    //   this.IssueTypeFacadeService.getIssueTypes()
    //     .pipe(takeUntil(this.sub$))
    //     .subscribe((issues) => {
    //       this.myIssue = issues;
    //     });
    // });
    //------------------
  }
  loadAllInTasks() {
    combineLatest([
      this.boardFacadeService.getMyBoards$(),
      this.projectFacadeService.getProjectUsers$(),
      this.IssueTypeFacadeService.getIssueTypes(),
    ])
      .pipe(takeUntil(this.sub$))
      .subscribe(([ boards, users, issueTypes]) => {

        this.currentBoards = boards;

        console.log(this.currentBoards);
        this.projectUsers = users;
        this.myIssue = issueTypes;
      });
  }
  deleteUser(id: number) {
    console.log(id);
    this.projectUsers = this.projectUsers.filter((user) => user.id !== id);
    this.projectService
      .removeUserFromProject({
        projectId: this.currentProject.id,
        userId: id,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
  openBoardForm() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(1);
    this.boardFacadeService.additional.next(true);
  }

  openUserForm() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(3);
    this.usersFacadeService.additionalUser.next(true);
  }
  addNewIssue() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(2);
    this.IssueTypeFacadeService.additionalIssue.next(true);
  }

  editIssue(id) {
    this.router.navigate([`stepper/issues/edit/${id}`]);
    this.stepperService.goToStep(2);
  }

  goToBoard(id: number) {
    if (this.currentBoards.length < 2) {
      this.router.navigate([`/task/project-board/${id}`]);
      console.log(this.currentBoards.length);
    } else {
      this.router.navigate(['/task/board-select']);
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
