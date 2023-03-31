import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import {ProjectStateModule} from "../../store";
import {currentProject} from "../../store/project/project.selectors";
import {select, Store} from "@ngrx/store";
import {first} from "rxjs/operators";

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
  constructor(private projectFacade: ProjectFacadeService, private store: Store<{project: ProjectStateModule}>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {


    return this.store
      .pipe(
        select(currentProject),
        first(),
        switchMap((project) => {
          if(project) {
            request = request.clone({
              setHeaders: {
                'project': project.id.toString()
              }
            });
          }
          return next.handle(request);
        })
       )

     }
}
