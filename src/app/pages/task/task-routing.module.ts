import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { BoardSelectComponent } from './board-select/board-select.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
  },
  {
    path: 'project-board/:id',
    component: ProjectBoardComponent,
  },
  {
    path: 'project-board',
    component: ProjectBoardComponent,
  },
  {
    path: 'board-select',
    component: BoardSelectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
