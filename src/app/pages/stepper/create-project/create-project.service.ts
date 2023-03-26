import { Injectable } from '@angular/core';

import { Project } from 'src/app/core/interfaces';
import { ProjectHttpService } from 'src/app/core/services/project-http.service';
import { ProjectFacadeService } from '../../../facades/project.facade.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProjectService extends ProjectHttpService {
  constructor(private projectFacade: ProjectFacadeService) {
    super();
  }
  override createProject(payload: Project) {
    return super.createProject(payload);
  }
}
