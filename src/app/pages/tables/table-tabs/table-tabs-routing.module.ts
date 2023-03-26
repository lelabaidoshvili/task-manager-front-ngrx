import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableTabsComponent } from './table-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TableTabsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableTabsRoutingModule {}
