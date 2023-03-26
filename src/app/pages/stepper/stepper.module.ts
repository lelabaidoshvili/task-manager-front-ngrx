import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperRoutingModule } from './stepper-routing.module';
import { StepperComponent } from './stepper.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { BoardComponent } from './board/board.component';
import { IssueTypeComponent } from './issue-type/issue-type.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { DialogComponent } from './dialog/dialog';
import { EpicsComponent } from './epics/epics.component';

@NgModule({
  declarations: [
    StepperComponent,
    CreateProjectComponent,
    BoardComponent,
    IssueTypeComponent,
    AddUsersComponent,
    DialogComponent,
    EpicsComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [CommonModule, StepperRoutingModule, SharedModule],
})
export class StepperModule {}
