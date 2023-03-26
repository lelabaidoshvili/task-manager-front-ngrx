import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { Board, BoardResponse } from '../core/interfaces';
import { BoardHttpService } from '../core/services/board-http.service';

@Injectable({
  providedIn: 'root',
})
export class BoardFacadeService {
  additional: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  additional$ = this.additional.asObservable();

  myBoards: BehaviorSubject<BoardResponse[]> = new BehaviorSubject<
    BoardResponse[]
  >([]);
  boards$ = this.myBoards.asObservable();
  update$ = new BehaviorSubject<boolean>(false);
  constructor(private boardHttpService: BoardHttpService) {}

  createBoard(payload: Board) {
    return this.boardHttpService.createBoard(payload);
  }

  getBoards() {
    return this.boardHttpService.getBoards();
  }

  getBoardById(id: number) {
    return this.boardHttpService.getBoardById(id);
  }

  updateBoardById(id: number, payload: Board) {
    return this.boardHttpService.updateBoardById(id, payload);
  }

  deleteBoardById(id: number) {
    return this.boardHttpService.deleteBoardById(id);
  }

  getMyBoards$(): Observable<BoardResponse[]> {
    return this.boardHttpService
      .getBoards()
      .pipe(tap((boards) => this.myBoards.next(boards)));
  }
}
