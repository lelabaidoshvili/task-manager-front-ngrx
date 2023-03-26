import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  UserPasswordUpdate,
  Users, UsersResponse,
  UsersRole,
} from '../core/interfaces/users.interface';
import { UsersHttpService } from '../core/services/users-http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersFacadeService {
  constructor(private usersHttpService: UsersHttpService) {}
  additionalUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  additionalUser$ = this.additionalUser.asObservable();

  createUsers(payload: Users) {
    return this.usersHttpService.createUsers(payload);
  }
  getAllUsers() {
    return this.usersHttpService.getAllUsers();
  }

  getUsers() {
    return this.usersHttpService.getUsers();
  }

  getUserById(id: number) {
    return this.usersHttpService.getUserById(id);
  }

  updateUserById(id: number, payload: Users) {
    return this.usersHttpService.updateUserById(id, payload);
  }

  deleteUserById(id: number) {
    return this.usersHttpService.deleteUserById(id);
  }

  updateUsersPassword(payload: UserPasswordUpdate) {
    return this.usersHttpService.updateUsersPassword(payload);
  }


}
