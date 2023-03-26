import { Injectable } from '@angular/core';
import { TaskInterface, TaskPutInterface } from '../core/interfaces/task';
import { TaskHttpService } from '../core/services/task-http.service';

@Injectable({
  providedIn: 'root',
})
export class TasksFacadeService {
  constructor(private taskHttpService: TaskHttpService) {}

  createTask(payload: TaskInterface) {
    return this.taskHttpService.createTask(payload);
  }

  getTasks(boardId: any) {
    return this.taskHttpService.getTasks(boardId);
  }

  getTaskById(id: number) {
    return this.taskHttpService.getTaskById(id);
  }

  updateTaskById(id: number, payload) {
    return this.taskHttpService.updateTaskById(id, payload);
  }

  deleteTaskById(id: number) {
    return this.taskHttpService.deleteTaskById(id);
  }
}
