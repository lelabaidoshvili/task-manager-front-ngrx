import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectFacadeService } from '../../facades/project.facade.service';

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
  constructor(private projectFacade: ProjectFacadeService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const project = this.projectFacade.getProject();
    const project = this.projectFacade.current.getValue();
    if (project) {
      return next.handle(
        request.clone({
          setHeaders: { project: String(project.id) },
        })
      );
    }
    return next.handle(request);
  }
}
