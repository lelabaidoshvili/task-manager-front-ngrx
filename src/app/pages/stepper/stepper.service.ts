import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  step = new BehaviorSubject<number>(0);
  stepNumber$: Observable<number> = this.step.asObservable();

  goToStep(step: number) {
    this.step.next(step);
  }
}
