import { Component, OnInit } from '@angular/core';
import { Users, UsersResponse } from '../../core/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil, of, switchMap } from 'rxjs';
import { ConfirmComponent } from '../../shared/confirm/confirm.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { PageEvent } from '@angular/material/paginator';
import { UsersHttpService } from '../../core/services/users-http.service';
import { UsersRoleComponent } from './users-role/users-role.component';
import {Store} from "@ngrx/store";
import {UserStateModel} from "../../store/users";
import {loadUsers} from "../../store/users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns = ['id', 'fullName', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Users>();
  sub$ = new Subject();
  pageIndex = 1;
  total = 0;
  pageSize = 10;
  user: UsersResponse[] = [];

  constructor(
    private userService: UsersHttpService,
    public dialog: MatDialog,
    private store: Store<{user: UserStateModel}>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      loadUsers({ page: this.pageIndex, limit: this.pageSize })
    );
    this.store
      .select((state) => state.user)
      .subscribe((data) => {
        this.dataSource.data = data.users;
      });
  }
  getUsers() {
    this.userService
      .getUsers({
        page: this.pageIndex,
        limit: this.pageSize,
      })
      .subscribe((users) => {
        console.log(users);
        this.dataSource.data = users.data;
        this.total = users.totalCount;
      });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.userService.deleteUserById(id);
          }
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.getUsers();
        }
      });
  }
  updateUser(id: number) {
    const dialogRef = this.dialog.open(UsersEditComponent, {
      data: {
        userId: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }
  pageEvent($event: PageEvent) {
    console.log($event);
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getUsers();
  }
  setUser(user: UsersResponse) {
    const dialogRef = this.dialog.open(UsersRoleComponent, {
      data: {
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }
}
