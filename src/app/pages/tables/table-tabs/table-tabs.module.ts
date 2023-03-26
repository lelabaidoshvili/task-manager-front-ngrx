import { NgModule } from '@angular/core';

import { TableTabsRoutingModule } from './table-tabs-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectsTableComponent } from '../projects-table/projects-table.component';
import { TableTabsComponent } from './table-tabs.component';
import { BoardTablesComponent } from '../board-tables/board-tables.component';

@NgModule({
  declarations: [
    TableTabsComponent,
    ProjectsTableComponent,
    BoardTablesComponent,
  ],
  imports: [TableTabsRoutingModule, SharedModule],
})
export class TableTabsModule {}
