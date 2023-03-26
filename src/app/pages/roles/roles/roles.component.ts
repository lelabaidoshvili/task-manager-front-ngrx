import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";
import {RoleResponse} from "../../../core/interfaces/role.interface";
import {PageEvent} from "@angular/material/paginator";
import {RoleHttpService} from "../../../core/services/role-http.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<RoleResponse>();
  sub$ = new Subject();
  pageIndex = 1;
  total = 0;
  pageSize = 10;

  constructor(
    private roleService: RoleHttpService
  ) { }

  ngOnInit(): void {
    this.getRoles()
  }
  getRoles() {
    this.roleService.getRole({
      page: this.pageIndex,
      limit: this.pageSize
    })
      .subscribe(roles => {
        this.dataSource.data = roles.data;
        this.total = roles.totalCount;
      });


  }


  addRole(id: number) {

  }

  delete(id: number) {

  }
  pageEvent($event: PageEvent) {
    console.log($event)
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getRoles()
  }



}
