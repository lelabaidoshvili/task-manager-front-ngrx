import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  IssueType,
  IssueTypeResponse,
} from '../core/interfaces/issuetype.interface';

import { IssueTypeHttpService } from '../core/services/issue-type-http.service';

@Injectable({
  providedIn: 'root',
})
export class IssueTypeFacadeService {
  myIssues: BehaviorSubject<IssueTypeResponse[]> = new BehaviorSubject<
    IssueTypeResponse[]
  >([]);
  issues$ = this.myIssues.asObservable();

  additionalIssue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  additionalIssue$ = this.additionalIssue.asObservable();
  constructor(private issueTypeHttpService: IssueTypeHttpService) {}

  createIssueType(payload: IssueType) {
    return this.issueTypeHttpService.createIssueType(payload);
  }

  updateIssueType(id: number, payload: IssueType) {
    return this.issueTypeHttpService.updateIssueType(id, payload);
  }

  deleteIssueTypeById(id: number) {
    return this.issueTypeHttpService.deleteIssueTypeById(id);
  }
  //needs to be removed
  getIssueTypes() {
    return this.issueTypeHttpService.getIssueTypes();
  }

  getIssueTypeById(id: number) {
    return this.issueTypeHttpService.getIssueTypeById(id);
  }

  getMyIssueTypes$(): Observable<IssueTypeResponse[]> {
    return this.issueTypeHttpService
      .getIssueTypes()
      .pipe(tap((issues) => this.myIssues.next(issues)));
  }
}
