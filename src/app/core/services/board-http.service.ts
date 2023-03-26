import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Board, BoardResponse, ColumnResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardHttpService extends BaseService {
  createBoard(payload: Board): Observable<BoardResponse> {
    return this.post<BoardResponse>('board', payload);
  }

  getBoards(): Observable<BoardResponse[]> {
    return this.get<BoardResponse[]>('board');
  }

  getBoardById(id: number): Observable<BoardResponse> {
    return this.get<BoardResponse>(`board/${id}`);
  }

  updateBoardById(id: number, payload: Board): Observable<BoardResponse> {
    return this.put<BoardResponse>(`board/${id}`, payload);
  }

  deleteBoardById(id: number): Observable<BoardResponse> {
    return this.delete<BoardResponse>(`board/${id}`);
  }

  // getColumns(id: number): Observable<ColumnResponse[]> {
  //   return this.get<ColumnResponse[]>(`board/${id}/columns`);
  // }
}
