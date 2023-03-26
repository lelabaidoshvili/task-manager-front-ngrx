import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StepperService } from './stepper.service';
import { Router} from "@angular/router";
import '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  isLinear = true;
  stepperService: StepperService = inject(StepperService);

  stepNumber$: Observable<number> = this.stepperService.stepNumber$;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  submit() {
    this.router.navigate(['task'])
  }
}
