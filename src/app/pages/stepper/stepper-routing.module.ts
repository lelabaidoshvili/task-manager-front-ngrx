import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { StepperComponent } from './stepper.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { IssueTypeComponent } from './issue-type/issue-type.component';

const routes: Routes = [
  {
    path: '',
    component: StepperComponent,
  },
  {
    path: 'projects/edit/:id',
    component: CreateProjectComponent,
  },

  {
    path: 'boards/edit/:id',
    component: BoardComponent,
  },
  {
    path: 'issues/edit/:id',
    component: IssueTypeComponent,
  },
  {
    path: 'users/edit/:id',
    component: AddUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepperRoutingModule {}
