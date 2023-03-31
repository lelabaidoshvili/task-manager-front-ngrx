import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Project } from 'src/app/core/interfaces/project.interface';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { AuthFacadeService } from '../../auth/auth-facade.service';
import {Store} from "@ngrx/store";
import {ProjectStateModule} from "../../../store";
import {loadAllProjects} from "../../../store";
import {myProjects} from "../../../store/project/project.selectors";

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent implements OnInit, OnDestroy {
  allProjects: Project[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  sub$ = new Subject();

  constructor(
    private projectFacadeService: ProjectFacadeService,
    private authFacadeService: AuthFacadeService,
    private router: Router,
    public dialog: MatDialog,
    public store: Store<{project: ProjectStateModule}>
  ) {}

  ngOnInit(): void {
    if (this.authFacadeService.user.roles[0].name === 'Super Admin') {
      this.store.dispatch(loadAllProjects());
      this.store.select(myProjects).subscribe((projects) => {
        this.allProjects = projects;
      });
      // this.projectFacadeService
      //   .getProjects()
      //   .pipe(takeUntil(this.sub$))
      //   .subscribe((projects) => {
      //     this.allProjects = projects;
      //   });
    } else {
      this.store.select(myProjects).subscribe((projects) => {
        this.allProjects = projects;
      });
    }
  }


  updateProject(id: number) {
    this.router.navigate([`stepper/projects/edit/${id}`]);
  }

  deleteProject(id: number) {
    this.projectFacadeService.deleteProject(id).subscribe((res) => {
      console.log(res);
      this.projectFacadeService
        .getProjects()
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {
          this.allProjects = res;
        });
    });
  }

  ngOnDestroy() {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
