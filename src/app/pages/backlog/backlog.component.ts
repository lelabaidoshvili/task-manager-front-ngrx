import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { TasksResponse } from 'src/app/core/interfaces/task';
import { TasksFacadeService } from 'src/app/facades/tasks-facade.sevice';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTaskComponent } from '../task/add-task/add-task.component';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'issueType', 'actions'];
  sub$ = new Subject();
  dataSource = new MatTableDataSource<TasksResponse>();
  constructor(
    private taskFacadeService: TasksFacadeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskFacadeService
      .getTasks({ isBacklog: true })
      .pipe(takeUntil(this.sub$))
      .subscribe((tasks) => {
        this.dataSource.data = tasks;
      });
  }
  addEditTask(taskId?: number) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: { isBacklog: true, taskId },
    });

    dialogRef.afterClosed().subscribe((task) => {
      if (task) {
        this.getTasks();
      }
    });
  }

  deleteTask(taskId: number) {
    this.taskFacadeService
      .deleteTaskById(taskId)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        if (res) {
          this.getTasks();
        }
      });
  }

  ngOnDestroy() {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
