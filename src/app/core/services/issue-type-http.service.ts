import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

import {
  IssueDeletedResponse,
  IssueType,
  IssueTypeResponse,
} from '../interfaces/issuetype.interface';

@Injectable({
  providedIn: 'root',
})
export class IssueTypeHttpService extends BaseService {
  createIssueType(payload: IssueType): Observable<IssueTypeResponse> {
    return this.post<IssueTypeResponse>('issue-type', payload);
  }

  updateIssueType(
    id: number,
    payload: IssueType
  ): Observable<IssueTypeResponse> {
    return this.put<IssueTypeResponse>(`issue-type/${id}`, payload);
  }

  deleteIssueTypeById(id: number): Observable<IssueDeletedResponse> {
    return this.delete<IssueDeletedResponse>(`issue-type/${id}`);
  }

  getIssueTypes(): Observable<IssueTypeResponse[]> {
    return this.get<IssueTypeResponse[]>('issue-type');
  }

  getIssueTypeById(id: number): Observable<IssueTypeResponse> {
    return this.get<IssueTypeResponse>(`issue-type/${id}`);
  }
}
